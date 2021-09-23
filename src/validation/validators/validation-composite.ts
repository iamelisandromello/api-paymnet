import { Validation } from '@/presentation/interfaces'
import { isArray } from 'lodash'

export class ValidationComposite implements Validation {
  constructor (private readonly validations: Validation[]) {}

  validate (input: any): Error | null {
    for (const validation of this.validations) {
      const error = (isArray(validation))
        ? this.processValidationAnArray(validation, input)
        : this.processValidation(validation, input)
      if (error) { return error }
    }
    return null
  }

  private processValidation (validation: any, input: any): Error | null {
    const error = validation.validate(input)
    if (error) { return error }
    return null
  }

  private processValidationAnArray (validations: any, input: any): Error | null {
    for (const validator of validations) {
      const error = validator.validate(input)
      if (error) { return error }
    }
    return null
  }
}
