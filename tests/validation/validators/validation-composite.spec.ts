import { ValidationComposite } from '@/validation/validators'
import { mockValidation } from '@/tests/validation/mocks'
import { MissingParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/interfaces'

import faker from 'faker'

type SutTypes = {
  sut: ValidationComposite
  validationStubs: Validation[]
}

const makeSut = (): SutTypes => {
  const validationStubs = [
    mockValidation(),
    mockValidation()
  ]
  const sut = new ValidationComposite(validationStubs)
  return {
    sut,
    validationStubs
  }
}

describe('Validation Composite', () => {
  test('Should return an Error if any validation fails', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const error = sut.validate({ field: faker.random.word })
    expect(error).toEqual(new MissingParamError('field'))
  })

  test('Should return the first error if more  then one validation fails', () => {
    const { sut, validationStubs } = makeSut()
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new Error())
    jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const error = sut.validate({ field: faker.random.word })
    expect(error).toEqual(new Error())
  })

  test('Should not return if validation succeedes', () => {
    const { sut } = makeSut()
    const error = sut.validate({ field: faker.random.word })
    expect(error).toBeFalsy()
  })
})
