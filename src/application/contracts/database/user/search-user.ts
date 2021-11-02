export interface SearchUserRepositoryContract {
  load: (params: SearchUserRepositoryContract.Params) => Promise<SearchUserRepositoryContract.Result>
}

export namespace SearchUserRepositoryContract {
  export type Params = {
    name: string
  }
  export type Result = { userId: string } | undefined
}
