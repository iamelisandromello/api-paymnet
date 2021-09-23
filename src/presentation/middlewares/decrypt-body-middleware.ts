import {
  Middleware,
  HttpResponse
} from '@/presentation/interfaces'
import {
  forbidden,
  success,
  serverError
} from '@/presentation/helpers/http'
import { DecryptBodyError } from '@/presentation/errors'
import { DecryptBody } from '@/domain/usecases/cryptography'

export class DecryptBodyMiddleware implements Middleware {
  constructor (private readonly decryptBody: DecryptBody) {}

  async handle (request: DecryptBodyMiddleware.Request): Promise<HttpResponse> {
    try {
      const { isEncrypted } = request
      if (isEncrypted) {
        const { bodyEncripted } = request
        const isBody = (bodyEncripted) && await this.decryptBody.decrypt(bodyEncripted)
        if (!isBody) {
          return forbidden(new DecryptBodyError())
        }
        return success(isBody)
      }
      return success({})
    } catch (error: any) {
      return serverError(error)
    }
  }
}

export namespace DecryptBodyMiddleware {
  export type Request = {
    isEncrypted?: string
    bodyEncripted?: string
  }
}
