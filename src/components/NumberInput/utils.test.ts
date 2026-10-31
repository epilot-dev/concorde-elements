import type { ChangeMeta } from 'react-number-format'
import { describe, it, expect, vi } from 'vitest'

import {
  getLocaleNumberFormat,
  isWithinMaxDigits,
  MAX_SAFE_NUMBER_DIGITS,
  normalizeDecimalSeparator
} from './utils'

const insertingWhole = (value: string): ChangeMeta => ({
  from: { start: 0, end: 0 },
  to: { start: 0, end: value.length },
  lastValue: ''
})

describe('getLocaleNumberFormat', () => {
  it('should return correct separators for en-US', () => {
    const { groupSeparator, decimalSeparator } = getLocaleNumberFormat('en-US')

    expect(groupSeparator).toBe(',')
    expect(decimalSeparator).toBe('.')
  })

  it('should return correct separators for de-DE', () => {
    const { groupSeparator, decimalSeparator } = getLocaleNumberFormat('de-DE')

    expect(groupSeparator).toBe('.')
    expect(decimalSeparator).toBe(',')
  })

  it('should fallback to browser locale when no argument is provided', () => {
    vi.spyOn(window.navigator, 'language', 'get').mockReturnValue('en-GB')
    const { groupSeparator, decimalSeparator } = getLocaleNumberFormat()

    expect(groupSeparator).toBe(',')
    expect(decimalSeparator).toBe('.')
  })
})

describe('normalizeDecimalSeparator', () => {
  it('reinterprets "." as the locale decimal separator when none is present', () => {
    expect(normalizeDecimalSeparator('2.2', ',', insertingWhole('2.2'))).toBe(
      '2,2'
    )
  })

  it('leaves the value untouched for dot-decimal locales', () => {
    expect(normalizeDecimalSeparator('2.2', '.', insertingWhole('2.2'))).toBe(
      '2.2'
    )
  })

  it('treats "." as a group separator when the locale separator is already present', () => {
    expect(
      normalizeDecimalSeparator('1.234,56', ',', insertingWhole('1.234,56'))
    ).toBe('1.234,56')
  })

  it('only rewrites separators within the inserted range, preserving existing group separators', () => {
    expect(
      normalizeDecimalSeparator('1.234.', ',', {
        from: { start: 5, end: 5 },
        to: { start: 5, end: 6 },
        lastValue: '1.234'
      })
    ).toBe('1.234,')
  })
})

describe('MAX_SAFE_NUMBER_DIGITS', () => {
  it('keeps every integer of that many digits below MAX_SAFE_INTEGER', () => {
    expect(Number('9'.repeat(MAX_SAFE_NUMBER_DIGITS))).toBeLessThan(
      Number.MAX_SAFE_INTEGER
    )
    expect(String(Number.MAX_SAFE_INTEGER).length).toBe(
      MAX_SAFE_NUMBER_DIGITS + 1
    )
  })

  it('round-trips decimals of that many digits through a JS number', () => {
    for (const value of ['123456789012345', '1234567890.12345', '-0.12345678901234']) {
      expect(String(parseFloat(value))).toBe(value)
    }
  })
})

describe('isWithinMaxDigits', () => {
  it('allows any value without a limit', () => {
    expect(isWithinMaxDigits('1'.repeat(30), '')).toBe(true)
  })

  it('counts digits only, not sign or decimal separator', () => {
    expect(isWithinMaxDigits('-1234567890.12345', '', 15)).toBe(true)
    expect(isWithinMaxDigits('-1234567890.123456', '', 15)).toBe(false)
    expect(isWithinMaxDigits('1234567890123456', '', 15)).toBe(false)
  })

  it('allows removing digits from a value already over the limit', () => {
    const prefilled = '12345678901234567890'

    expect(isWithinMaxDigits(prefilled.slice(0, -1), prefilled, 15)).toBe(true)
    expect(isWithinMaxDigits(`${prefilled}1`, prefilled, 15)).toBe(false)
  })
})
