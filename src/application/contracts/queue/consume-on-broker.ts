export interface ConsumeOnBrokerContract {
  consumeSynchronousResponse: (params: any) => Promise<ConsumeOnBrokerContract.Result>
}

export namespace ConsumeOnBrokerContract {
  export type Params = {
    queue: string
    correlationId: string
  }

  export type Result = {
    token: string
  } | undefined
}
