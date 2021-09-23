export interface StartPaymentBrokerContract {
  start: () => Promise<StartPaymentBrokerContract.Result>
}

export namespace StartPaymentBrokerContract {
  export type Result = boolean
}
