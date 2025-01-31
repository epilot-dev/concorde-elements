import { addDays } from 'date-fns'
import { describe, it, expect } from 'vitest'

import type { WeekDays } from '../types'
import { findNearestAvailableDay } from '../utils'

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
