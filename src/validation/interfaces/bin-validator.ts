export interface BinValidator {
  isValid: (params: BinValidator.Params) => BinValidator.Result
}

export namespace BinValidator {
  export type Params = {
    listRegex: Array<{
      schemeId: string
      scheme: string
      regex: string
    }>
    cardNumber: number
  }

  export type Result = {
    scheme: string
    schemeId: string
  } | undefined
}
