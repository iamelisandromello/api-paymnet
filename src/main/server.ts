import './config/module-alias'
import { env } from '@/main/config'
import { MongoHelper } from '@/infra/database/mongo/'

MongoHelper.connect(env.mongoUrl , env.databaseName)
  .then(async () => {
    console.log(`Connect MongoDB: ${env.mongoUrl} Database: ${env.databaseName}`)
    const app = (await import('./config/app')).default
    app.listen(env.port, () =>
      console.log(`Server running at: http://localhost:${env.port}`)
    )
  })
  .catch(err => console.log('SERVER ERROR: ', err))
