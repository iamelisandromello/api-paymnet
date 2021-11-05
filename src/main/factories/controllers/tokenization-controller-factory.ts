import { env } from '@/main/config'
import { TokenizationController } from '@/presentation/controllers'
import { Controller } from '@/presentation/interfaces/controller'
import { CheckBinService, PublishToQueueService } from '@/application/services/card'
import { RabbitmqAdapter } from '@/infra/brokers'
import { SchemeMongoRepository } from '@/infra/database/mongo'
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

  const controller = new TokenizationController(
    checkBinService,
    publishToQueueService
  )
  return controller
}
