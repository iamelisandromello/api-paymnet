export interface HashComparerContract {
  compare: (plaitext: string, digest: string) => Promise<boolean>
}
