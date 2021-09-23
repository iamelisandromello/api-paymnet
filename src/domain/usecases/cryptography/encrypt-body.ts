export interface EncryptBody {
  encrypt: (params: EncryptBody.Request) => Promise<EncryptBody.Result>
}

export namespace EncryptBody {
  export type Request = {
    body?: any
    headers?: any
  }

  export type Result = {
    encryptedBody: string
  }
}
