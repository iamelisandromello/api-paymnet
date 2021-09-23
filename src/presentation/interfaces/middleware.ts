import { HttpResponse } from '@/presentation/interfaces/http'

export interface Middleware<T = any> {
  handle: (httpRequest: T) => Promise<HttpResponse>
}
