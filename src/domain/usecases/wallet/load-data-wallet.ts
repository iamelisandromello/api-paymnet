export interface LoadDataWallet {
  search: (params: LoadDataWallet.Params) => Promise<LoadDataWallet.Result>
}

export namespace LoadDataWallet {
  export type Params = {
    userId: string
    schemeId: string
  }

  export type Result = {
    paymentProviderId: string
    tokenCard: string
  } | false
}
