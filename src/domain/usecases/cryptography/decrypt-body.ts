import { DecryptParams, DecryptResult } from '@/domain/usecases/cryptography/types'

export interface DecryptBody {
  decrypt: (ciphertext: DecryptParams) => Promise<DecryptResult>
}
