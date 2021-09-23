export interface HasherContract {
  hash: (value: string) => Promise<string>
}
