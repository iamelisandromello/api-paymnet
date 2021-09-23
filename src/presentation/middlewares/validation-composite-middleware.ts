import {
  Middleware,
  HttpResponse,
  HttpRequest,
  Validation
} from '@/presentation/interfaces'
import {
  badRequest,
  serverError
} from '@/presentation/helpers/http'

export class ValidationCompositeMiddleware implements Middleware {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) { return badRequest(error) }

      return { body: httpRequest.body, statusCode: 200 }
    } catch (error: any) {
      return serverError(error)
    }
  }
}
