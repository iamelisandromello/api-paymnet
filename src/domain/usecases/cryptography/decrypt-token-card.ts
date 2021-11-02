import { DecryptParams, DecryptResult } from '@/domain/usecases/cryptography/types'

export interface DecryptTokenCard {
  decrypt: (ciphertext: DecryptParams) => Promise<DecryptResult>
}
