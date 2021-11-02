import { PublishOnBrokerContract, StartPaymentBrokerContract, ConsumeOnBrokerContract } from '@/application/contracts/publications'
import { Connection, Channel, connect, Message, Replies } from 'amqplib'

import { v4 as uuidv4 } from 'uuid'

export class RabbitmqAdapter implements
PublishOnBrokerContract,
StartPaymentBrokerContract,
ConsumeOnBrokerContract {
  private conn?: Connection
  private channel?: Channel
  private messageResponse?: {}
  private correlation?: string

  constructor (private readonly uri: string) {}

  async start (): Promise<boolean> {
    try {
      this.conn = await connect(this.uri)
      this.channel = await this.conn.createChannel()
    } catch (error) {
      console.log('Error starting message broker :', error)
      return false
    }
    return true
  }

  async publishInQueue (params: PublishOnBrokerContract.Params): Promise<boolean> {
    const { queue, message } = params
    try {
      return this.channel?.sendToQueue(queue, Buffer.from(message)) ?? false
    } catch (error) {
      console.log('Error publishing to queue: ', error)
      return false
    }
  }

  async publishInExchange (
    exchange: string,
    routingKey: string,
    message: string
  ): Promise<boolean> {
    return this.channel?.publish(exchange, routingKey, Buffer.from(message)) ?? false
  }

  async consume (
    queue: string, callback: (message: Message) => void
  ): Promise<Replies.Consume | boolean> {
    return this.channel?.consume(queue, (message) => {
      if (message) {
        callback(message)
        this.channel?.ack(message)
      }
    }) ?? false
  }

  async synchronousPublishing (params: PublishOnBrokerContract.Params): Promise<any> {
    const { queue, message } = params
    try {
      const correlation = uuidv4()

      this.channel?.sendToQueue(queue, Buffer.from(message),
        { correlationId: correlation, replyTo: 'tokenization-reponse' })

      return correlation
    } catch (error) {
      console.log('Error publishing to queue: ', error)
      return false
    }
  }

  async consumeSynchronousResponse (params: ConsumeOnBrokerContract.Params): Promise<ConsumeOnBrokerContract.Result> {
    const { queue, correlationId } = params
    this.correlation = correlationId
    this.channel?.assertQueue(queue, { durable: true })
    this.channel?.prefetch(1)

    await this.channel?.consume(queue, (msg) => {
      if (msg) {
        this.messageResponse = {}
        if (msg.properties.correlationId === this.correlation) {
          console.log(` [.] Got ${msg.content.toString()}`)
          const messageConsume = JSON.parse(msg.content.toString())
          this.messageResponse = messageConsume?.message
        }
      }
    }, { noAck: true })

    return this.messageResponse ?? undefined
  }
}
