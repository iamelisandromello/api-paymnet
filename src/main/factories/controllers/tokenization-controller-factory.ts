import { env } from '@/main/config'
import { TokenizationController } from '@/presentation/controllers'
import { Controller } from '@/presentation/interfaces/controller'
import { CheckBinService, PublishToQueueService } from '@/application/services/card'
import { LoadUserService, AddUserService } from '@/application/services/user'
import { RabbitmqAdapter } from '@/infra/brokers'
import { SchemeMongoRepository, UserMongoRepository } from '@/infra/database/mongo'
import { BinValidatorAdapter } from '@/infra/validators/bin-validator-adapter'

export const makeTokenizationController = (): Controller => {
  const uri = env.uriRabbitMq
  const queue = env.queueTokenizeCard
  const rabbitmqAdapter = new RabbitmqAdapter(uri)

  const publishToQueueService = new PublishToQueueService(
    rabbitmqAdapter,
    rabbitmqAdapter,
    rabbitmqAdapter,
    queue
  )

  const schemeRepository = new SchemeMongoRepository()
  const binValidatorAdapter = new BinValidatorAdapter()
  const checkBinService = new CheckBinService(schemeRepository, binValidatorAdapter)
  const userRepository = new UserMongoRepository()
  const loadUserService = new LoadUserService(userRepository)
  const addUserService = new AddUserService(userRepository)

  const controller = new TokenizationController(
    checkBinService,
    loadUserService,
    addUserService,
    publishToQueueService
  )
  return controller
}
