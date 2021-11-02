import { Router } from 'express'
import { adaptRoute } from '@/main/adapters'
import { makeTransactionController } from '@/main/factories/controllers'
import { decryptBody } from '@/main/middlewares'
import { validatorsTransaction } from '@/validation/middlewares/validators-controllers/controllers'

export default (router: Router): void => {
  router.post(
    '/transaction',
    decryptBody,
    validatorsTransaction,
    adaptRoute(makeTransactionController())
  )
}
