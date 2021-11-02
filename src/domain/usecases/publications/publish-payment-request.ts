export interface PublishPaymentRequest {
  publish: (params: PublishPaymentRequest.Params) => Promise<PublishPaymentRequest.Result>
}

export namespace PublishPaymentRequest {
  export type Params = {
    tokenCard: string
    valor: string
    paymentProviderId: string
  }

  export type Result = {
    status: boolean
  }
}
