import type { ChangeMeta } from 'react-number-format'
import { describe, it, expect, vi } from 'vitest'

import { getLocaleNumberFormat, normalizeDecimalSeparator } from './utils'

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
