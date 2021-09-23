export class DecryptBodyError extends Error {
  constructor () {
    super('Error in decrypting the body process')
    this.name = 'DecryptBodyError'
  }
}
