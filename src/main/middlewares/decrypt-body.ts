import { adaptMiddleware } from '@/main/adapters/'
import { makeDecryptBodyMiddleware } from '@/main/factories/middlewares'

export const decryptBody = adaptMiddleware(makeDecryptBodyMiddleware())
