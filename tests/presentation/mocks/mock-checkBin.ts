import { CheckBin } from '@/domain/usecases/card'

export const mockCheckBin = (): CheckBin => {
  class CheckBinStub implements CheckBin {
    name: string = ''
    async check (cardNumber: number): Promise<CheckBin.Result> {
      return { name: this.name }
    }
  }
  return new CheckBinStub()
}
