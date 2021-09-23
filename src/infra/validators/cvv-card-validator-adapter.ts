import { CvvCardValidator } from '@/validation/interfaces'

export class CvvCardValidatorAdapter implements CvvCardValidator {
  isValid (cvv: string): boolean {
    const expression = /^[0-9]{3}$/
    return expression.test(cvv)
  }
}
