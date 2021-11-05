import { PublishTokenRequest } from '@/domain/usecases/publications'
import {
  PublishOnBrokerContract,
  StartPaymentBrokerContract,
  ConsumeOnBrokerContract
} from '@/application/contracts/publications'

export class PublishToQueueService implements PublishTokenRequest {
  constructor (
    private readonly publishOnBroker: PublishOnBrokerContract,
    private readonly startTokenizeBroker: StartPaymentBrokerContract,
    private readonly consumeOnBroker: ConsumeOnBrokerContract,
    private readonly queueBroker: string
  ) {}

  async publish (
    params: PublishTokenRequest.Params
  ): Promise<PublishTokenRequest.Result> {
    await this.startTokenizeBroker.start()

    const paramsPublish = this.prepareParamsBroker(params)

    const isPublished = await this.publishOnBroker.synchronousPublishing(paramsPublish)

    if (isPublished) {
      const messageResponse = await this.consumeOnBroker.consumeSynchronousResponse({
        queue: 'tokenization-reponse',
        correlationId: isPublished
      })

      console.log('Service: Tokenization return Adapter', messageResponse)

      const check = {
        lastDigitsCard: '7245',
        scheme: 'Master'
      }
      return check ?? undefined
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
