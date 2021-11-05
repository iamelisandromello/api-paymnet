import { AddUser } from '@/domain/usecases/user'
import {
  InsertUserRepositoryContract
} from '@/application/contracts/database/user'

export class AddUserService implements AddUser {
  constructor (
    private readonly insertUserRepository: InsertUserRepositoryContract
  ) {}

  async add (params: AddUser.Params): Promise<AddUser.Result> {
    const userId = await this.insertUserRepository.insert(params)
    console.log('Service: ', userId)
    return userId ?? false
  }
}
