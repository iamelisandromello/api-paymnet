import { EncryptBody } from '@/domain/usecases/cryptography'
import { EncrypterContract } from '@/application/contracts/cryptography'

export class EncryptBodyService implements EncryptBody {
  constructor (private readonly encrypter: EncrypterContract) {}

  async encrypt (request: EncryptBody.Request): Promise<EncryptBody.Result> {
    const encryptedBody = await this.encrypter.encrypt(request.body)
    return Promise.resolve({
      encryptedBody
    })
  }
}
