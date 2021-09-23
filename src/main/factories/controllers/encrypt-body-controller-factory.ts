import { env } from '@/main/config/env'
import { EncryptBodyController } from '@/presentation/controllers'
import { Controller } from '@/presentation/interfaces/controller'
import { EncryptBodyService } from '@/application/services/cryptography'
import { CryptoAdapter } from '@/infra/cryptography'

export const makeEncryptBodyController = (): Controller => {
  const APP_KEY = env.appKey
  const cripto = new CryptoAdapter(APP_KEY ?? 'undefined')
  const createTokenService = new EncryptBodyService(cripto)

  const controller = new EncryptBodyController(createTokenService)
  return controller
}
