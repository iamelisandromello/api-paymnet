import { Middleware ,Validation } from '@/presentation/interfaces'
import { ValidationCompositeMiddleware } from '@/presentation/middlewares'

export const makeValidationCompositeMiddleware = (
  validations: Validation
): Middleware => {
  return new ValidationCompositeMiddleware(validations)
}
