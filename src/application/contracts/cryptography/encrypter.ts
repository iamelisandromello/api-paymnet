import { EncryptParams } from '@/domain/usecases/cryptography/types'

export interface EncrypterContract {
  encrypt: (value: EncrypterContract.Params) => Promise<string>
}

export namespace EncrypterContract {
  export type Params = EncryptParams
}
