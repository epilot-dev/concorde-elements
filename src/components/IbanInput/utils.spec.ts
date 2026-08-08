import { IBAN_Specifications } from '@epilot/validators'
import { expect, describe, it, beforeEach } from 'vitest'

import { getIbanPlaceholder } from './utils'

const MOCK_IBAN_SPECS: Record<string, { example: string; length: number }> = {
  DE: {
    example: 'DE44XXXXXXXXXXXXXXXXXX',
    length: 22
  },
  AT: {
    example: 'AT611904300234573201',
    length: 20
  },
  LU: {
    example: 'LU280019400644750000',
    length: 20
  },
  FR: {
    example: 'FR7630006000011234567890189',
    length: 27
  }
}

describe('getIbanPlaceholder function', () => {
  beforeEach(() => {
    Object.defineProperty(IBAN_Specifications, 'get', {
      value: (key: string) => MOCK_IBAN_SPECS[key],
      configurable: true
    })
  })
  it('should return the placeholder for Germany by default', () => {
    const { placeholder, maskLength } = getIbanPlaceholder('en-US')

    expect(placeholder).toBe('DE00000000000000000000')
    expect(maskLength).toBe(22)
  })

  it('should return the placeholder for Germany', () => {
    const { placeholder, maskLength } = getIbanPlaceholder('de-DE')

    expect(placeholder).toBe('DE00000000000000000000')
    expect(maskLength).toBe(22)
  })

  it('should return the placeholder for Luxembourg', () => {
    const { placeholder, maskLength } = getIbanPlaceholder('fr-LU')

    expect(placeholder).toBe('LU000000000000000000')
    expect(maskLength).toBe(20)
  })

  it('should return the placeholder for Austria', () => {
    const { placeholder, maskLength } = getIbanPlaceholder('de-AT')

    expect(placeholder).toBe('AT000000000000000000')
    expect(maskLength).toBe(20)
  })
})
