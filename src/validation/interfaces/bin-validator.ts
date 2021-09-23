export interface BinValidator {
  isValid: (params: BinValidator.Params) => BinValidator.Result
}

export namespace BinValidator {
  export type Params = {
    listRegex: Array<{
      id: string
      name: string
      regex: string
    }>
    cardNumber: number
  }

  export type Result = {
    name: string
  } | undefined
}
