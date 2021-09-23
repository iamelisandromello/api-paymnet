import {
  EncrypterContract,
  DecrypterContract
} from '@/application/contracts/cryptography'

import crypto from 'crypto'

export class CryptoAdapter implements EncrypterContract, DecrypterContract {
  constructor (private readonly secret: string) {}

  async encrypt (value: EncrypterContract.Params): Promise<string> {
    const data = JSON.stringify(JSON.stringify(value))

    return this.encryptData(data)
  }

  async decrypt (value: DecrypterContract.Params): Promise<DecrypterContract.Result> {
    const decrypted = this.decryptData(value)
    const parsed = JSON.parse(JSON.parse(decrypted))

    return parsed
  }

  private settings (): Record<string, any> {
    return {
      key: Buffer.from(this.secret, 'base64'),
      sha: 'sha256',
      mode: 'AES-256-CBC'
    }
  }

  /**
   * Create payload encrypted with master key.
   * Payload contains: iv, value, mac
   * @param {String} data to be encrypted
   * @return {String} Base64 encdoded payload
   */
  private encryptData (data: string): string {
    const serializedValue = this.hashSerialize(data)

    try {
      const _iv = crypto.randomBytes(16)

      const base64Iv = _iv.toString('base64')

      const cipher = crypto.createCipheriv(
        this.settings().mode,
        this.settings().key,
        _iv
      )

      let encrypted = cipher.update(serializedValue, 'utf8', 'base64')

      encrypted += cipher.final('base64')

      const _mac = this.hash(base64Iv, encrypted)

      const payloadObject = {
        iv: base64Iv,
        value: encrypted,
        mac: _mac
      }

      const _payload = JSON.stringify(payloadObject)

      return Buffer.from(_payload).toString('base64')
    } catch (e) {
      throw new Error('Cannot encrypt data provided !')
    }
  }

  /**
   * Decrypts payload with master key
   * @param {String} Payload - base64 encoded json with iv, value, mac information
   */
  private decryptData (ciphertext: string): string {
    const _payload = this.getJsonPayload(ciphertext)

    const _iv = Buffer.from(_payload.iv, 'base64')

    const decipher = crypto.createDecipheriv(
      this.settings().mode,
      this.settings().key,
      _iv
    )

    let decrypted = decipher.update(_payload.value, 'base64', 'utf8')

    decrypted += decipher.final('utf8')

    return this.hashDeserialize(decrypted)
  }

  hashDeserialize = (data: string): string => {
    let str = String(data)
    str = str.substring(str.indexOf(':', 2) + 1, str.lastIndexOf(';'))

    if (str.substring(0, 2) === '""') {
      str = str.substring(1, str.length - 1)
    }

    return str
  }

  private readonly hashSerialize = (data: string): string => {
    if (typeof data !== 'string') {
      throw new Error('Data to be serialized must be type of string !')
    }

    const str = String(data)
    return `s:${str.length}:"${str}";`
  }

  /**
   * Get JSON object from payload.
   * Payload needs to be base64 encoded and must contains iv, value, mac attributes.
   * MAC is validated
   * @param {String} payload
   * @return {Object} Data with iv, value, mac
   */
  private readonly getJsonPayload = (payload: string): Record<string, any> => {
    if (payload === undefined || payload === '') {
      throw new Error('Payload MUST NOT be empty !')
    }

    if (typeof payload !== 'string') {
      throw new Error('Payload MUST be string !')
    }

    try {
      const _payload = JSON.parse(Buffer.from(payload, 'base64').toString())

      if (!this.isValidPayload(_payload)) {
        throw new Error('Payload is not valid !')
      }

      if (!this.isValidMac(_payload)) {
        throw new Error('Mac is not valid !')
      }

      return _payload
    } catch (e) {
      throw new Error('Payload cannot be parsed !')
    }
  }

  /**
   * MAC validation function.
   * Payload must be decoded to JSON
   * @param {Object} payload
   */
  private readonly isValidMac = (payload: Record<string, string>): boolean => {
    const bytes = crypto.randomBytes(16)
    const calculatedMac = this.calculateMac(payload, bytes)

    const originalMac = this.hashHmac(payload.mac, bytes)
    return originalMac === calculatedMac
  }

  /**
   * Crypto function to hash data with given key
   * @param {String} data
   * @param {String} key
   */
  private readonly hashHmac = (data: string, key: Buffer): string => {
    const hmac = crypto.createHmac(this.settings().sha, key)
    hmac.update(data)
    return hmac.digest('hex')
  }

  /**
   * Caclulate MAC.
   * Paylod needs to be decoded to JSON with getJsonPayload(payload)
   * @param {Object} payload with iv & value
   * @param {String} key
   */
  private readonly calculateMac = (payload: Record<string, string>, key: Buffer): string => {
    const hashedData = this.hash(payload.iv, payload.value)
    return this.hashHmac(hashedData, key)
  }

  /**
   * Hash function.
   * Combines initialization vector (iv) with data to be hashed (value).
   * Uses master key to hash results
   * @param {String} iv Initialization vector
   * @param {String} value Data
   */
  private readonly hash = (iv: string, value: string): string => {
    if (iv === undefined || iv === '') {
      throw new Error('Iv is not defined !')
    }
    if (value === undefined || value === '') {
      throw new Error('Value is not defined !')
    }
    const data = String(iv) + String(value)
    return this.hashHmac(data, this.settings().key)
  }

  /**
   * Payload validation function.
   * Payload must be decoded to JSON
   * @param {Object} payload
   */
  private readonly isValidPayload = (payload: Record<string, unknown>): boolean => {
    return (
      Object.prototype.hasOwnProperty.call(payload, 'iv') &&
      Object.prototype.hasOwnProperty.call(payload, 'value') &&
      Object.prototype.hasOwnProperty.call(payload, 'mac')
    )
  }
}
