import { addDays } from 'date-fns'
import { describe, it, expect } from 'vitest'

import type { WeekDays } from '../types'
import {
  findNearestAvailableDay,
  generateDateMask,
  getLocaleDateFormat,
  getLocaleDateString,
  isValidDateLength,
  isValidDatePatternString,
  parseDatePatternString
} from '../utils'

describe('findNearestAvailableDay', () => {
  it('returns today when no disableDays, minDate, or maxDate are provided', () => {
    const today = new Date()
    const result = findNearestAvailableDay({ today })

    expect(result).toEqual(today)
  })

  it('returns minDate when minDate is after today', () => {
    const today = new Date()
    const minDate = addDays(today, 3) // Min date is 3 days after today
    const result = findNearestAvailableDay({ today, minDate })

    expect(result).toEqual(minDate)
  })

  it('returns maxDate when today exceeds maxDate', () => {
    const today = new Date()
    const maxDate = addDays(today, -1) // Max date is 1 day before today
    const result = findNearestAvailableDay({ today, maxDate })

    expect(result).toEqual(maxDate)
  })

  it('skips disabled days and returns the next available day', () => {
    const today = new Date('2023-09-20') // Wednesday
    const disableDays: WeekDays[] = [3, 4, 5]
    const result = findNearestAvailableDay({ today, disableDays })

    expect(result.getDay()).toEqual(6) // The next available day is Saturday (6)
  })

  it('returns minDate when it skips disabled days and minDate is set', () => {
    const today = new Date('2023-09-20') // Wednesday
    const disableDays: WeekDays[] = [3, 4, 5]
    const minDate = new Date('2023-09-23') // Saturday
    const result = findNearestAvailableDay({ today, disableDays, minDate })

    expect(result).toEqual(minDate) // Saturday (minDate) is available
  })

  it('does not exceed maxDate when skipping disabled days', () => {
    const today = new Date('2023-09-20') // Wednesday
    const disableDays: WeekDays[] = [3, 4, 5, 6]
    const maxDate = new Date('2023-09-22') // Max date is Friday
    const result = findNearestAvailableDay({ today, disableDays, maxDate })

    expect(result).toEqual(maxDate) // Returns maxDate (Friday) since all other days are disabled
  })

  it('returns minDate when today is before minDate and handles disableDays', () => {
    const today = new Date('2023-09-20') // Wednesday
    const minDate = new Date('2023-09-23') // Saturday
    const disableDays: WeekDays[] = [0, 6]
    const result = findNearestAvailableDay({ today, minDate, disableDays })

    expect(result.getDay()).toEqual(1) // The nearest available day is Monday (1)
  })

  it('returns maxDate when all days until maxDate are disabled', () => {
    const today = new Date('2023-09-20') // Wednesday
    const disableDays: WeekDays[] = [3, 4, 5, 6, 0, 1, 2]
    const maxDate = new Date('2023-09-25') // Max date is next Monday
    const result = findNearestAvailableDay({ today, disableDays, maxDate })

    expect(result).toEqual(maxDate) // The max date is returned as no other days are available
  })
})

describe('generateDateMask', () => {
  it('should generate correct mask for de locale without time', () => {
    const result = generateDateMask('de', false)

    expect(result).toBe('99.99.9999')
  })

  it('should generate correct mask for de locale with time', () => {
    const result = generateDateMask('de', true)

    expect(result).toBe('99.99.9999, 99:99')
  })

  it('should generate correct mask for en-US locale without time', () => {
    const result = generateDateMask('en', false)

    expect(result).toBe('99/99/9999')
  })

  it('should generate correct mask for en-US locale with time', () => {
    const result = generateDateMask('en', true)

    expect(result).toBe('99/99/9999, 99:99')
  })

  it('should default to de locale when none is provided', () => {
    const result = generateDateMask(undefined, false)

    expect(result).toBe('99.99.9999')
  })
})

describe('getLocaleDateFormat', () => {
  it('should return "dd.MM.yyyy" for locale "de"', () => {
    const format = getLocaleDateFormat('de')

    expect(format).toBe('dd.MM.yyyy')
  })

  it('should return "dd/MM/yyyy" for locale "en-GB"', () => {
    const format = getLocaleDateFormat('en-GB')

    expect(format).toBe('dd/MM/yyyy')
  })

  it('should return "dd/MM/yyyy" for locale "en-US" too', () => {
    const format = getLocaleDateFormat('en-US')

    expect(format).toBe('dd/MM/yyyy')
  })
})

describe('isValidDateLength', () => {
  it('returns true for valid date-only string when hasTime=false', () => {
    expect(isValidDateLength('12032014', false)).toBe(true)
  })

  it('returns true for valid date-only string when hasTime=true', () => {
    expect(isValidDateLength('120320141130', true)).toBe(true)
  })
})

describe('isValidDatePatternString', () => {
  it('returns true for valid date-only string ', () => {
    expect(isValidDatePatternString('12032014')).toBe(true)
  })

  it('returns true for valid date+time string', () => {
    expect(isValidDatePatternString('120320141130')).toBe(true)
  })

  it('rejects invalid day/month combos', () => {
    expect(isValidDatePatternString('31022020')).toBe(false) // Feb 31
    expect(isValidDatePatternString('01132020')).toBe(false) // month 13
  })

  it('rejects invalid hour/minute', () => {
    expect(isValidDatePatternString('1203202475')).toBe(false) // hour 24, min 75
  })

  it('rejects wrong lengths', () => {
    expect(isValidDatePatternString('1203201')).toBe(false)
    expect(isValidDatePatternString('12032014123')).toBe(false)
  })
})

describe('parseDatePatternString', () => {
  // Helper to compare dates by value
  function datesEqual(a: Date | null, b: Date | null) {
    if (a === null || b === null) return a === b

    return a.getTime() === b.getTime()
  }

  it('parses date-only string into midnight Date', () => {
    const datestring = parseDatePatternString('12032014')
    const expected = new Date(2014, 3 - 1, 12, 0, 0)

    expect(datesEqual(datestring, expected)).toBe(true)
  })

  it('parses date+time string into correct Date', () => {
    const datestring = parseDatePatternString('120320141130')
    const expected = new Date(2014, 3 - 1, 12, 11, 30)

    expect(datesEqual(datestring, expected)).toBe(true)
  })

  it('returns null for invalid length', () => {
    expect(parseDatePatternString('1203201')).toBeNull()
    expect(parseDatePatternString('12032014123')).toBeNull()
  })

  it('returns a Date object even for overflow values (use isValidDatePatternString to guard)', () => {
    const datestring = parseDatePatternString('31012020') // Jan 31, 2020
    const expected = new Date(2020, 1 - 1, 31, 0, 0)

    expect(datesEqual(datestring, expected)).toBe(true)
  })
})

describe('getLocaleDateString', () => {
  it('should return "dd.MM.yyyy" for locale "de" and time selected is false', () => {
    const format = getLocaleDateString('de', false)

    expect(format).toBe('dd.MM.yyyy')
  })

  it('should return "dd.MM.yyyy, HH:mm" for locale "de" and time selected is true', () => {
    const format = getLocaleDateString('de', true)

    expect(format).toBe('dd.MM.yyyy, HH:mm')
  })

  it('should return "dd/MM/yyyy" for locale "en-US" and time selected is false', () => {
    const format = getLocaleDateString('en-US', false)

    expect(format).toBe('dd/MM/yyyy')
  })

  it('should return "dd/MM/yyyy, HH:mm" for locale "en-US" and time selected is true', () => {
    const format = getLocaleDateString('en-US', true)

    expect(format).toBe('dd/MM/yyyy, HH:mm')
  })

  it('should return "dd/MM/yyyy" for locale "en-GB" and time selected is false', () => {
    const format = getLocaleDateString('en-GB', false)

    expect(format).toBe('dd/MM/yyyy')
  })

  it('should return "dd/MM/yyyy, HH:mm" for locale "en-GB" and time selected is true', () => {
    const format = getLocaleDateString('en-GB', true)

    expect(format).toBe('dd/MM/yyyy, HH:mm')
  })
})
