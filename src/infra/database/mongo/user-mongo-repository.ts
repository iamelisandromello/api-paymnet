
import { MongoHelper } from '@/infra/database/mongo'
import {
  SearchUserRepositoryContract,
  InsertUserRepositoryContract
} from '@/application/contracts/database/user'

export class UserMongoRepository implements
SearchUserRepositoryContract {
  async load (params: SearchUserRepositoryContract.Params): Promise<SearchUserRepositoryContract.Result> {
    const { name } = params
    const badgeCollection = await MongoHelper.getCollection('users', 'liuv')
    const collection = await badgeCollection.findOne({ name: name })

    if (collection) {
      const user = MongoHelper.map(collection)
      const userId: string = user?.id

      return { userId: userId }
    }
    return undefined
  }

  async insert (
    params: InsertUserRepositoryContract.Params
  ): Promise<InsertUserRepositoryContract.Result> {
    const badgeCollection = await MongoHelper.getCollection('users', 'liuv')
    const result = await badgeCollection.insertOne(params)

    return (result.insertedId) && { userId: result?.insertedId.toString() }
  }
}
