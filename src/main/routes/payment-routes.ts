import { Router } from 'express'
import { adaptRoute } from '@/main/adapters'
import { makePaymentController } from '@/main/factories/controllers'
import { decryptBody } from '@/main/middlewares'
import { validatorsTokenization } from '@/validation/middlewares/validators-controllers/controllers'

export default (router: Router): void => {
  router.post(
    '/payments',
    decryptBody,
    validatorsTokenization,
    adaptRoute(makePaymentController())
  )
}
