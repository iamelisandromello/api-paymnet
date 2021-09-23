import { CreditCardValidator } from '@/validation/interfaces'

import validator from 'validator'

export class CreditCardValidatorAdapter implements CreditCardValidator {
  isValid (cardNumber: string): boolean {
    return validator.isCreditCard(cardNumber)
  }
}
