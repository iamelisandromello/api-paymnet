import {
  adaptMiddleware,
  ValidationComposite,
  makeValidationCompositeMiddleware
} from '../dependencies-of-validators'

import { ValidatorBuilder } from '../validator-builder'

const makeTransactionValidation = (): ValidationComposite => {
  const mandatoryFields = ['name', 'cardNumber', 'cvv']
  const validator = new ValidatorBuilder()
    .requireFields(mandatoryFields)
    .creditCard('cardNumber')
    .cvv('cvv')
    .build()

  return new ValidationComposite(validator)
}

export const validatorsTransaction = adaptMiddleware(
  makeValidationCompositeMiddleware(
    makeTransactionValidation()
  )
)
