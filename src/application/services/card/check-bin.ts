import { CheckBin } from '@/domain/usecases/card'
import {
  LoadBinsRepositoryContract
} from '@/application/contracts/database/card'
import {
  BinValidator
} from '@/validation/interfaces/bin-validator'

export class CheckBinService implements CheckBin {
  constructor (
    private readonly loadBinsRepository: LoadBinsRepositoryContract,
    private readonly binValidator: BinValidator
  ) {}

  async check (cardNumber: number): Promise<CheckBin.Result> {
    const listRegex = await this.loadBinsRepository.load()
    if (listRegex) return this.binValidator.isValid({ listRegex, cardNumber })
    return undefined
  }
}
