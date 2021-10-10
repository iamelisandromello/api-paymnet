export interface LoadBinsRepositoryContract {
  load: () => Promise<LoadBinsRepositoryContract.Result>
}

export namespace LoadBinsRepositoryContract {
  export type Result = Array<{
    schemeId: string
    scheme: string
    regex: string
  }> | null
}
