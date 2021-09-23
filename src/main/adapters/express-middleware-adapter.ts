import { Middleware } from '@/presentation/interfaces/middleware'

import { Request, Response, NextFunction } from 'express'

export const adaptMiddleware = (middleware: Middleware) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const request = {
      timerToken: req.headers?.['timer-token'],
      isEncrypted: req.headers?.['is-encrypted'],
      ...(req.headers || {})
    }

    if (request.isEncrypted && req.body?.data) {
      Object.assign(request, { bodyEncripted: req.body.data })
    }

    /*     request.isEncrypted &&
      Object.assign(request, { bodyEncripted: req.body.data }) */

    !request.isEncrypted &&
      Object.assign(request, { body: req.body })

    const httpResponse = await middleware.handle(request)

    if (httpResponse.statusCode === 200) {
      Object.assign(req.body, httpResponse?.body || {})

      if (req.headers?.['is-encrypted']) {
        delete req.headers?.['is-encrypted']
        delete req.body?.data
      }
      next()
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}
