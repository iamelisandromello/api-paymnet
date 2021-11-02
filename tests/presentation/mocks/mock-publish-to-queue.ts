import { PublishTokenRequest } from '@/domain/usecases/publications/publish-token-request'

export const mockPublishToQueue = (): PublishTokenRequest => {
  class PublishTokenRequestStub implements PublishTokenRequest {
    params: Record<string, any> = {}
    result: undefined
    async publish (params: PublishTokenRequest.Params): Promise<PublishTokenRequest.Result> {
      this.params = params
      return this.result
    }
  }
  return new PublishTokenRequestStub()
}
