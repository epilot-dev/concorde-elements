import { describe, it, expect, vi } from 'vitest'

import { getLocaleNumberFormat } from './utils'

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
