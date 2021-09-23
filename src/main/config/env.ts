export const env = {
  mongoUrl: process.env.MONGO_URL ?? 'undefined',
  appKey: process.env.APP_KEY,
  port: process.env.PORT,
  accessCodeExpireMinutes: process.env.ACCESS_CODE_EXPIRE_MINUTES,
  accessCodeLength: process.env.ACCESS_CODE_LENGTH,
  accessTokenleadTime: process.env.ACCESS_TOKEN_LEAD_TIME,
  databaseName: process.env.DATABASE_NAME ?? 'undefined',
  uriRabbitMq: process.env.URI_RABBITMQ ?? 'undefined',
  queueTokenizeCard: process.env.QUEUE_TOKENIZE_CARD ?? 'undefined'
}
