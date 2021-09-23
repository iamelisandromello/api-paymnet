import {
  EmailValidation,
  EmailValidatorAdapter,
  CreditCardValidatorAdapter,
  CreditCardValidation,
  CvvCardValidation,
  CvvCardValidatorAdapter,
  Validation,
  RequiredFieldValidation
} from './dependencies-of-validators'

export class ValidatorBuilder {
  private readonly validations: Validation[] = []

  private addStep (data: any): ValidatorBuilder {
    this.validations.push(data)
    return this
  }

  email (data: string): ValidatorBuilder {
    const validator = new EmailValidation(data, new EmailValidatorAdapter())
    return this.addStep(validator)
  }

  creditCard (data: string): ValidatorBuilder {
    const validator = new CreditCardValidation(data, new CreditCardValidatorAdapter())
    return this.addStep(validator)
  }

  cvv (data: string): ValidatorBuilder {
    const validator = new CvvCardValidation(data, new CvvCardValidatorAdapter())
    return this.addStep(validator)
  }

  requireFields (data: string[]): any {
    const requires = data.map((field: string) => {
      return new RequiredFieldValidation(field)
    })
    return this.addStep(requires)
  }

  build (): object[] {
    return this.validations
  }
}
