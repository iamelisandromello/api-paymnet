export interface AddUser {
  add: (params: AddUser.Params) => Promise<AddUser.Result>
}

export namespace AddUser {
  export type Params = {
    name: string
    email?: string
  }

  export type Result = {
    userId: string
  } | false
}
