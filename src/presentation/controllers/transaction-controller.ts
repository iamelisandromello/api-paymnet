import {
  Controller,
  HttpRequest,
  HttpResponse
} from '@/presentation/interfaces'
import { serverError, success, brokerError, badRequest } from '@/presentation/helpers/http'
import { BrokerError, InvalidParamError } from '@/presentation/errors'
import { CheckBin } from '@/domain/usecases/card'
import { LoadUser } from '@/domain/usecases/user'
import { LoadDataWallet } from '@/domain/usecases/wallet'
import { PublishPaymentRequest } from '@/domain/usecases/publications'

export class TransactionController implements Controller {
  constructor (
    private readonly checkBin: CheckBin,
    private readonly loadUser: LoadUser,
    private readonly loadDataWallet: LoadDataWallet,
    private readonly publishPaymentRequest: PublishPaymentRequest
  ) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const scheme = await this.checkBin.check(request.body.cardNumber)
      if (!scheme) return badRequest(new InvalidParamError('Number Card'))

      Object.assign(request.body, {
        scheme: scheme?.scheme ?? undefined,
        schemeId: scheme?.schemeId ?? undefined
      })

      console.log('Controller Transaction: ', request.body)
      const { name, schemeId } = request.body

      const isUserId = await this.loadUser.search({ name })

      if (isUserId) {
        const wallet = await this.loadDataWallet.search({ userId: isUserId.userId, schemeId })
        console.log('Service WALLET: ', wallet)

        Object.assign(wallet, { amount: '30,00' })

        if (wallet) {
          const token = await this.publishPaymentRequest.publish(this.preparePlubishParams(wallet))
          if (!token) return brokerError(new BrokerError())
        }
      }

      const token = 'JKALAM67575757575'

      return success(token)
    } catch (error: any) {
      return serverError(error)
    }
  }

  private preparePlubishParams (
    params: Record<string, any>
  ): PublishPaymentRequest.Params {
    return {
      tokenCard: params.tokenCard,
      amount: params.amount,
      paymentProviderId: params.paymentProviderId
    }
  }
}
