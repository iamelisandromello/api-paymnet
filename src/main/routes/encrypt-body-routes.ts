import { Router } from 'express'
import { adaptRoute } from '@/main/adapters'
import { makeEncryptBodyController } from '@/main/factories/controllers'

export default (router: Router): void => {
  router.post('/encrypt-body', adaptRoute(makeEncryptBodyController()))
}
