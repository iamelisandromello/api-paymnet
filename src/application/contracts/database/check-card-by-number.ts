export interface CheckCardByNumberRepositoryContract {
  check: (
    cardNumber: number
  ) => Promise<CheckCardByNumberRepositoryContract.Result>
}

export namespace CheckCardByNumberRepositoryContract {
  export type Result = boolean
}
