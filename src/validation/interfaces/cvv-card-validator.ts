export interface CvvCardValidator {
  isValid: (cvv: string) => boolean
}
