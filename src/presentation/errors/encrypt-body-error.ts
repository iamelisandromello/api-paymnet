export class EncryptBodyError extends Error {
  constructor () {
    super('Error in encrypting the body process')
    this.name = 'EncryptBodyError'
  }
}
