import { MongoHelper as sut } from '@/infra/database/mongo'

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL ?? 'undefined', 'liuv')
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  test('Should reconnect if mongodb is down', async () => {
    let accountCollection = await sut.getCollection('cards', 'liuv')
    expect(accountCollection).toBeTruthy()
    await sut.disconnect()
    accountCollection = await sut.getCollection('cards', 'liuv')
    expect(accountCollection).toBeTruthy()
  })
})
