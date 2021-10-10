
import { MongoHelper } from '@/infra/database/mongo'
import { SchemeTransformer } from '@/infra/database/mongo/transformers'
import {
  LoadBinsRepositoryContract
} from '@/application/contracts/database/card'

export class SchemeMongoRepository implements
LoadBinsRepositoryContract {
  async load (): Promise<LoadBinsRepositoryContract.Result> {
    const badgeCollection = await MongoHelper.getCollection('schemes', 'liuv')
    const collection = await badgeCollection.find(
      { regex: { $exists: true, $ne: null } },
      {
        projection: {
          name: 1,
          regex: 1
        }
      }
    )
      .sort({ name: 1 })
      .toArray()
      .then(items => {
        console.log(`Successfully found ${items.length} documents.`)
        return items
      })
      .catch(err => console.error(`Failed to find documents: ${err}`))

    return collection?.map(element => SchemeTransformer.map(element)) ?? null
  }
}
