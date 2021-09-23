import {
  success,
  serverError,
  forbidden
} from '@/presentation/helpers/http'
import {
  Controller,
  HttpRequest,
  HttpResponse
} from '@/presentation/interfaces'
import { EncryptBody } from '@/domain/usecases/cryptography'
import { EncryptBodyError } from '@/presentation/errors'

export class EncryptBodyController implements Controller {
  constructor (private readonly encryptBody: EncryptBody) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const encryptedBody = await this.encryptBody.encrypt(httpRequest)

      if (!encryptedBody) {
        return forbidden(new EncryptBodyError())
      }

      return success(encryptedBody)
    } catch (error: any) {
      return serverError(error)
    }
  }
}
