export interface LoadBinsRepositoryContract {
  load: () => Promise<LoadBinsRepositoryContract.Result>
}

export namespace LoadBinsRepositoryContract {
  export type Result = Array<{
    id: string
    name: string
    regex: string
  }> | null
}
