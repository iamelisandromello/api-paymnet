export interface LoadWalletForPaymentRepositoryContract {
  load: (params: LoadWalletForPaymentRepositoryContract.Params) => Promise<LoadWalletForPaymentRepositoryContract.Result>
}

export namespace LoadWalletForPaymentRepositoryContract {
  export type Params = {
    userId: string
    schemeId: string
  }
  export type Result = {
    paymentProviderId: string
    tokenCard: string
  } | undefined
}
