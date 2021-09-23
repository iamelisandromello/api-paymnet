import { CreditCardValidator } from '@/validation/interfaces'
import { Validation } from '@/presentation/interfaces'
import { InvalidParamError } from '@/presentation/errors'

export class CreditCardValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly creditCardValidator: CreditCardValidator
  ) {}

  validate (input: any): Error | null {
    const isValid = this.creditCardValidator.isValid(input[this.fieldName])
    if (!isValid) return new InvalidParamError(this.fieldName)
    return null
  }
}
