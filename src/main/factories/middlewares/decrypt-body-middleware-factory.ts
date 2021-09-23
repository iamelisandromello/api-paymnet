import { makeDecryptBodyService } from '@/main/factories/services'
import { Middleware } from '@/presentation/interfaces'
import { DecryptBodyMiddleware } from '@/presentation/middlewares'

export const makeDecryptBodyMiddleware = (): Middleware => {
  return new DecryptBodyMiddleware(makeDecryptBodyService())
}
