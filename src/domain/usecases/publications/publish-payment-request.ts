export interface PublishPaymentRequest {
  publish: (params: PublishPaymentRequest.Params) => Promise<PublishPaymentRequest.Result>
}

export namespace PublishPaymentRequest {
  export type Params = {
    tokenCard: string
    amount: string
    paymentProviderId: string
  }

  export type Result = {
    status: boolean
  }
}
