import { MongoHelper, QueryBuilder } from '@/infra/database/mongo'
import { LoadWalletForPaymentRepositoryContract } from '@/application/contracts/database/wallet'
import { walletPaymentProviderTransformer } from '@/infra/database/mongo/transformers'

export class WalletPaymentProviderMongoRepository implements LoadWalletForPaymentRepositoryContract {
  async load (
    params: LoadWalletForPaymentRepositoryContract.Params
  ): Promise<LoadWalletForPaymentRepositoryContract.Result> {
    const { userId, schemeId } = params
    const badgeCollection = await MongoHelper.getCollection('wallet', 'liuv')

    const query = new QueryBuilder()
      .match({
        user_id: userId,
        scheme_id: schemeId
      })
      .project({
        _id: 1
      })
      .lookup({
        from: 'wallet_payment_providers',
        localField: '_id',
        foreignField: 'wallet_id',
        as: 'wallet'
      })
      .project({
        _id: 0,
        wallet: {
          payment_provider_id: 1,
          token: 1
        }
      })
      .unwind({
        path: '$wallet'
      })
      .build()

    const aggregateResult = await badgeCollection.aggregate(query).toArray()
    if (aggregateResult.length === 0) return undefined

    const wallet = walletPaymentProviderTransformer.map(aggregateResult)
    return wallet ?? undefined
  }
}
