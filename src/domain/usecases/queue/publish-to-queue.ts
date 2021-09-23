export interface PublishTokenRequest {
  publish: (params: PublishTokenRequest.Params) => Promise<PublishTokenRequest.Result>
}

export namespace PublishTokenRequest {
  export type Params = {
    name: string
    cardNumber: string
    cvv: string
    scheme: string
  }

  export type Result = {
    token: string
  } | undefined
}
