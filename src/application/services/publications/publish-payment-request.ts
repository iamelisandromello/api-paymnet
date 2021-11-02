import { PublishPaymentRequest } from '@/domain/usecases/publications'
import {
  PublishOnBrokerContract,
  StartPaymentBrokerContract,
  ConsumeOnBrokerContract
} from '@/application/contracts/publications'

export class PublishPaymentRequestService implements PublishPaymentRequest {
  constructor (
    private readonly publishOnBroker: PublishOnBrokerContract,
    private readonly startTokenizeBrokerContract: StartPaymentBrokerContract,
    private readonly consumeOnBrokerContract: ConsumeOnBrokerContract,
    private readonly queueBroker: string
  ) {}

  async publish (
    params: PublishPaymentRequest.Params
  ): Promise<PublishPaymentRequest.Result> {
    await this.startTokenizeBrokerContract.start()

    const paramsPublish = this.prepareParamsBroker(params)

    const isPublished = await this.publishOnBroker.synchronousPublishing(paramsPublish)

    if (isPublished) {
      const messageResponse = await this.consumeOnBrokerContract.consumeSynchronousResponse({
        queue: 'payment-reponse',
        correlationId: isPublished
      })
      console.log('MessageResponse - Publish Payment ', messageResponse)
      return { status: true }
    }
    return { status: false }
  }

  private prepareParamsBroker (
    params: PublishPaymentRequest.Params
  ): PublishOnBrokerContract.Params {
    return {
      queue: this.queueBroker,
      message: JSON.stringify(params)
    }
  }
}
