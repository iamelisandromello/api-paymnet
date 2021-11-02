import { PublishTokenRequest } from '@/domain/usecases/publications'
import {
  PublishOnBrokerContract,
  StartPaymentBrokerContract,
  ConsumeOnBrokerContract
} from '@/application/contracts/publications'

export class PublishToQueueService implements PublishTokenRequest {
  constructor (
    private readonly publishOnBroker: PublishOnBrokerContract,
    private readonly startTokenizeBrokerContract: StartPaymentBrokerContract,
    private readonly consumeOnBrokerContract: ConsumeOnBrokerContract,
    private readonly queueBroker: string
  ) {}

  async publish (
    params: PublishTokenRequest.Params
  ): Promise<PublishTokenRequest.Result> {
    await this.startTokenizeBrokerContract.start()

    const paramsPublish = this.prepareParamsBroker(params)

    const isPublished = await this.publishOnBroker.synchronousPublishing(paramsPublish)

    if (isPublished) {
      const messageResponse = await this.consumeOnBrokerContract.consumeSynchronousResponse({
        queue: 'tokenization-reponse',
        correlationId: isPublished
      })
      const teste = { token: messageResponse?.token }
      return teste
    }
    return undefined
  }

  private prepareParamsBroker (
    params: PublishTokenRequest.Params
  ): PublishOnBrokerContract.Params {
    return {
      queue: this.queueBroker,
      message: JSON.stringify(params)
    }
  }
}
