export class BrokerError extends Error {
  constructor () {
    super('Error publishing to Message Broker queue')
    this.name = 'BrokerError'
  }
}
