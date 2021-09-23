import { DecryptParams, DecryptResult } from '@/domain/usecases/cryptography/types'

export interface DecrypterContract {
  decrypt: (ciphertext: DecryptParams) => Promise<DecrypterContract.Result>
}

export namespace DecrypterContract {
  export type Params = DecryptParams
  export type Result = DecryptResult
}
