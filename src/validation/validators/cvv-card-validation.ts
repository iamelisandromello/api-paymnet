import { CvvCardValidator } from '@/validation/interfaces'
import { Validation } from '@/presentation/interfaces'
import { InvalidParamError } from '@/presentation/errors'

export class CvvCardValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly cvvCardValidator: CvvCardValidator
  ) {}

  validate (input: any): Error | null {
    const isValid = this.cvvCardValidator.isValid(input[this.fieldName])
    if (!isValid) return new InvalidParamError(this.fieldName)
    return null
  }
}
