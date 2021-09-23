import { env } from '@/main/config/env'
import { DecryptBody } from '@/domain/usecases/cryptography'
import { DecryptBodyService } from '@/application/services/cryptography'
import { CryptoAdapter } from '@/infra/cryptography'

export const makeDecryptBodyService = (): DecryptBody => {
  const APP_KEY = env.appKey
  const cryptoAdapter = new CryptoAdapter(APP_KEY ?? 'undefined')
  return new DecryptBodyService(cryptoAdapter)
}
