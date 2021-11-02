import {
  Controller,
  HttpRequest,
  HttpResponse
} from '@/presentation/interfaces'
import { serverError, success, brokerError, badRequest } from '@/presentation/helpers/http'
import { BrokerError, InvalidParamError } from '@/presentation/errors'
import { CheckBin } from '@/domain/usecases/card'
import { PublishTokenRequest } from '@/domain/usecases/publications'

export class PaymentController implements Controller {
  constructor (
    private readonly checkBin: CheckBin,
    private readonly publishTokenRequest: PublishTokenRequest
  ) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const scheme = await this.checkBin.check(request.body.cardNumber)
      if (!scheme) return badRequest(new InvalidParamError('Number Card'))

      Object.assign(request.body, {
        scheme: scheme?.scheme ?? undefined,
        schemeId: scheme?.schemeId ?? undefined
      })

      const token = await this.publishTokenRequest.publish(request.body)
      if (!token) return brokerError(new BrokerError())

      return success(token)
    } catch (error: any) {
      return serverError(error)
    }
  }
}
