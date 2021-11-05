export interface InsertUserRepositoryContract {
  insert: (params: InsertUserRepositoryContract.Params) => Promise<InsertUserRepositoryContract.Result>
}

export namespace InsertUserRepositoryContract {
  export type Params = {
    name: string
    email?: string
  }
  export type Result = { userId: string } | false
}
