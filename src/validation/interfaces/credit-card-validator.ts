export interface CreditCardValidator {
  isValid: (cardNumber: string) => boolean
}
