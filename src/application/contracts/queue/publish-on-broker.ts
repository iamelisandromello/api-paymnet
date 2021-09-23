export interface PublishOnBrokerContract {
  synchronousPublishing: (params: PublishOnBrokerContract.Params) => Promise<PublishOnBrokerContract.Result>
}

export namespace PublishOnBrokerContract {
  export type Params = {
    queue: string
    message: string
  }

  export type Result = boolean
}
