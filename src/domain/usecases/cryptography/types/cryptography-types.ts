export type EncryptParams = {
  value: string | number | TypeJson | Array<string | number | TypeJson>
}

export type EncryptResult = {
  timerToken: string
}

export type DecryptParams = string

export type DecryptResult = string | number | TypeJson | Array<string | number | TypeJson>

type TypeJson = {
  [x: string]: string | number | boolean | Date | TypeJson
}
