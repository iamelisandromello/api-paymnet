import { BinValidator } from '@/validation/interfaces'

type NormalizeType = {
  id?: string
  name?: string
  regex?: string
} | undefined

export class BinValidatorAdapter implements BinValidator {
  isValid (params: BinValidator.Params): BinValidator.Result {
    const { listRegex, cardNumber } = params
    const binStr = cardNumber.toString()

    const badge = listRegex.find(expression => new RegExp(expression.regex).test(binStr))

    return this.normalizeData(badge)
  }

  private normalizeData (badge: NormalizeType): BinValidator.Result | undefined {
    if (!badge) return undefined

    return {
      name: badge.name ?? 'undefined'
    }
  }
}
