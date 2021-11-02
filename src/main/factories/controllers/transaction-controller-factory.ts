import { env } from '@/main/config'
import { TransactionController } from '@/presentation/controllers'
import { Controller } from '@/presentation/interfaces/controller'
import { CheckBinService } from '@/application/services/card'
import { PublishPaymentRequestService } from '@/application/services/publications'
import { LoadUserService } from '@/application/services/user'
import { LoadDataWalletService } from '@/application/services/wallet'
import { RabbitmqAdapter } from '@/infra/brokers'
import {
  SchemeMongoRepository,
  UserMongoRepository,
  WalletPaymentProviderMongoRepository
} from '@/infra/database/mongo'
import { BinValidatorAdapter } from '@/infra/validators/bin-validator-adapter'
import { DecryptTokenCardService } from '@/application/services/cryptography'
import { CryptoAdapter } from '@/infra/cryptography'

export const makeTransactionController = (): Controller => {
  const uri = env.uriRabbitMq
  const queue = env.queuePayment
  const rabbitmqAdapter = new RabbitmqAdapter(uri)

  const publishPaymentRequestService = new PublishPaymentRequestService(
    rabbitmqAdapter,
    rabbitmqAdapter,
    rabbitmqAdapter,
    queue
  )

  const schemeRepository = new SchemeMongoRepository()
  const binValidatorAdapter = new BinValidatorAdapter()
  const checkBinService = new CheckBinService(schemeRepository, binValidatorAdapter)

  const userMongoRepository = new UserMongoRepository()
  const loadUserService = new LoadUserService(userMongoRepository)

  const APP_KEY = env.appKey
  const cripto = new CryptoAdapter(APP_KEY ?? 'undefined')
  const decryptTokenCardService = new DecryptTokenCardService(cripto)
  const walletPaymentProviderRepository = new WalletPaymentProviderMongoRepository()
  const loadDataWalletService = new LoadDataWalletService(
    walletPaymentProviderRepository,
    decryptTokenCardService
  )

  const controller = new TransactionController(
    checkBinService,
    loadUserService,
    loadDataWalletService,
    publishPaymentRequestService
  )
  return controller
}
