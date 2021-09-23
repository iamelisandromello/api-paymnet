export interface CheckBin {
  check: (bin: number) => Promise<CheckBin.Result>
}

export namespace CheckBin {
  export type Result = {
    name: string
  } | undefined
}
