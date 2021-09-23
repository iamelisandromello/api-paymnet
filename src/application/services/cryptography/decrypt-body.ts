import { DecryptBody } from '@/domain/usecases/cryptography'
import { DecryptParams, DecryptResult } from '@/domain/usecases/cryptography/types'
import { DecrypterContract } from '@/application/contracts/cryptography/decrypter'

export class DecryptBodyService implements DecryptBody {
  constructor (private readonly decrypter: DecrypterContract) {}

  async decrypt (ciphertext: DecryptParams): Promise<DecryptResult> {
    return await this.decrypter.decrypt(ciphertext)
  }
}
