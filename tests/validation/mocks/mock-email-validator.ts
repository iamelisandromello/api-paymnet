import { EmailValidator } from '@/validation/interfaces'

export class EmailValidatorSpy implements EmailValidator {
  isEmailValid = true
  email: string = ''

  isValid (email: string): boolean {
    this.email = email
    return this.isEmailValid
  }
}
