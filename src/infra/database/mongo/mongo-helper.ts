import { MongoClient, Collection } from 'mongodb'
import { PropertiesGlobal } from '@/main/config/global'

declare const global: PropertiesGlobal
export const MongoHelper = {

  async connect (uri: string, nameDatabase: string): Promise<void> {
    global.uri = uri

    await MongoClient.connect(global.uri)
      .then((conn: MongoClient) => {
        global.db = conn.db(nameDatabase)
        global.conn = conn
      })
      .catch(async (err) => {
        return Promise.reject(new Error(err))
      })
  },

  async disconnect (): Promise<void> {
    await global.conn.close()
    global.conn = null
  },

  async getCollection (name: string, nameDatabase: string): Promise<Collection> {
    if (!global.conn) {
      await this.connect(global.uri, nameDatabase)
    }
    return global.db.collection(name)
  },

  map: (data: any): any => {
    const { _id, ...rest } = data
    return { ...rest, id: _id }
  }
}
