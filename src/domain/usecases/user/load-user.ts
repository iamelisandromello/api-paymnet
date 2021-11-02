export interface LoadUser {
  search: (params: LoadUser.Params) => Promise<LoadUser.Result>
}

export namespace LoadUser {
  export type Params = {
    name: string
  }

  export type Result = {
    userId: string
  } | false
}
