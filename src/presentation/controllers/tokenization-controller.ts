import {
  Controller,
  HttpRequest,
  HttpResponse
} from '@/presentation/interfaces'
import { serverError, success, brokerError, badRequest } from '@/presentation/helpers/http'
import { BrokerError, InvalidParamError } from '@/presentation/errors'
import { CheckBin } from '@/domain/usecases/card'
import { LoadUser, AddUser } from '@/domain/usecases/user'
import { PublishTokenRequest } from '@/domain/usecases/publications'

export class TokenizationController implements Controller {
  constructor (
    private readonly checkBin: CheckBin,
    private readonly loadUser: LoadUser,
    private readonly addUser: AddUser,
    private readonly publishTokenRequest: PublishTokenRequest
  ) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    try {
      const { cardNumber, name } = request.body
      const scheme = await this.checkBin.check(cardNumber)
      if (!scheme) return badRequest(new InvalidParamError('Number Card'))

      const isUser = await this.loadUser.search({ name })
      const userId = await this.guardClauseUser(isUser, name)

      Object.assign(request.body, {
        scheme: scheme?.scheme ?? undefined,
        schemeId: scheme?.schemeId ?? undefined,
        userId: userId
      })

      const token = await this.publishTokenRequest.publish(request.body)
      if (!token) return brokerError(new BrokerError())

      return success(token)
    } catch (error: any) {
      return serverError(error)
    }
  }

  private async guardClauseUser (user: LoadUser.Result, name: string): Promise<{ userId: string} | false> {
    if (user) return { userId: user.userId.toString() }
    return await this.addUser.add({ name })
  }
}
