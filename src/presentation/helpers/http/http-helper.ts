import { HttpResponse } from '@/presentation/interfaces/http'
import { ServerError } from '@/presentation/errors'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error)
})

export const brokerError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: error
})

export const success = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const noContent = (): HttpResponse => ({
  statusCode: 204,
  body: null
})

export const forbidden = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error
})
