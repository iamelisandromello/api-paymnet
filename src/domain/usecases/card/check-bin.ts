export interface CheckBin {
  check: (bin: number) => Promise<CheckBin.Result>
}

export namespace CheckBin {
  export type Result = {
    scheme: string
    schemeId: string
  } | undefined
}
