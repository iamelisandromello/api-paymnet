import { Controller } from '@/presentation/interfaces/controller'

import { Request, Response } from 'express'

export const adaptRoute = (controller: Controller) => {
  return async (
    req: Request,
    res: Response
  ): Promise<Response<unknown, Record<string, unknown>>> => {
    const request = {
      body: req.body,
      params: req.params
    }

    const httpResponse = await controller.handle(request)

    const isValidCode = !!(
      httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299
    )
    return res
      .status(httpResponse.statusCode)
      .json(
        isValidCode ? httpResponse.body : { error: httpResponse.body.message }
      )
  }
}
