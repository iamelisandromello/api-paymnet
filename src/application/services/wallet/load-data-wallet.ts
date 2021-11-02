import { LoadDataWallet } from '@/domain/usecases/wallet'
import { DecryptTokenCard } from '@/domain/usecases/cryptography'
import {
  LoadWalletForPaymentRepositoryContract
} from '@/application/contracts/database/wallet'

export class LoadDataWalletService implements LoadDataWallet {
  constructor (
    private readonly loadWalletForPaymentRepository: LoadWalletForPaymentRepositoryContract,
    private readonly decryptTokenCard: DecryptTokenCard
  ) {}

  async search (params: LoadDataWallet.Params): Promise<LoadDataWallet.Result> {
    const wallet = await this.loadWalletForPaymentRepository.load(params)

    if (wallet) {
      const isDecipher = await this.decryptTokenCard.decrypt(wallet.tokenCard)
      console.log('Token: ', wallet.tokenCard)
      if (!isDecipher) return false

      wallet.tokenCard = isDecipher.toString()
      return wallet ?? false
    }

    return false
  }
}
