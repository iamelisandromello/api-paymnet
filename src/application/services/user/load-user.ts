import { LoadUser } from '@/domain/usecases/user'
import {
  SearchUserRepositoryContract
} from '@/application/contracts/database/user'

export class LoadUserService implements LoadUser {
  constructor (
    private readonly searchUserRepository: SearchUserRepositoryContract
  ) {}

  async search (params: LoadUser.Params): Promise<LoadUser.Result> {
    const { name } = params
    const userId = await this.searchUserRepository.load({ name })
    return userId ?? false
  }
}
