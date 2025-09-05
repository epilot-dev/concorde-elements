import { addDays, format, isAfter, isValid, parseISO } from 'date-fns'
import { useEffect, useRef, useState } from 'react'
import type { MutableRefObject } from 'react'
import type DatePicker from 'react-datepicker'
import { useTranslation } from 'react-i18next'

import type { DatePickerHeaderSelectProps } from './components/types'
import type { WeekDays } from './types'

export const useCalendarObserver = ({
  date = null,
  isTimeSelectVisible,
  isHeaderSelectOpen
}: {
  date: Date | null
  isTimeSelectVisible?: boolean
  isHeaderSelectOpen?: boolean
}) => {
  const monthHeightRef = useRef(0)
  const datePickerRef = useRef<HTMLDivElement>(null)
  const calendarRef = useRef<DatePicker>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Manage scrolling to current date hour when calendar opens
  const hasScrolledToTime = useRef(false)
  const timeoutRefs = useRef<NodeJS.Timeout[]>([])

  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  // Sync time select height with month select height
  const updateTimeSelectHeight = useRef(() => {
    const datePicker = datePickerRef.current

    if (!datePicker) {
      return
    }

    const prevMonthHeight = monthHeightRef.current
    const monthContainer = datePicker.querySelector(
      '.react-datepicker__month-container'
    ) as HTMLDivElement
    const timeList = datePicker.querySelector(
      '.react-datepicker__time-list'
    ) as HTMLUListElement

    if (!monthContainer || !timeList) {
      return
    }

    const monthHeight = monthContainer?.clientHeight
    const expectedTimeHeight = monthHeight - 24
    const timeHeight = timeList?.clientHeight

    if (prevMonthHeight !== expectedTimeHeight || timeHeight !== monthHeight) {
      monthHeightRef.current = expectedTimeHeight
      if (timeList) {
        // max height is used because library sets height later in render tree which overrides this
        timeList.style.maxHeight = `${expectedTimeHeight}px`
      }
    }
  })

  // Scroll to time when calendar opens
  const scrollToTime = useRef((date: Date | null) => {
    const datePicker = datePickerRef.current

    if (!datePicker) {
      return
    }

    // Hack to perform action after time list element is available
    const timeoutId = setTimeout(() => {
      const timeList = datePicker.querySelector(
        '.react-datepicker__time-list'
      ) as HTMLUListElement

      if (!timeList) {
        return
      }

      if (!date) {
        // If no date, scroll to the 11th hour to make 8:00 visible
        const timeNode = Array.from(timeList.childNodes)?.find((node) => {
          const nodeDate = node.textContent

          if (!nodeDate) {
            return false
          }

          const [currentHour] = nodeDate.split(':')

          if (currentHour === '11') {
            return true
          }

          return false
        }) as HTMLLIElement

        timeNode?.scrollIntoView({
          block: 'nearest'
        })

        return
      }

      const hours = format(date, 'HH')
      const time = format(date, 'mm')

      // Find nearest hour
      const timeNode = Array.from(timeList.childNodes)?.find((node) => {
        const nodeDate = node.textContent

        if (!nodeDate) {
          return false
        }

        const [currentHour, currentMinute] = nodeDate.split(':')

        if (
          currentHour === hours &&
          Math.abs(parseInt(currentMinute) - parseInt(time)) < 30
        ) {
          return true
        }

        return false
      }) as HTMLLIElement

      const nextElement = timeNode?.nextElementSibling as HTMLElement

      if (nextElement) {
        if (nextElement.scrollIntoView) {
          nextElement.scrollIntoView({
            block: 'nearest'
          })
        }
      } else {
        timeNode?.scrollIntoView({
          block: 'nearest'
        })
      }
    })

    timeoutRefs.current?.push(timeoutId)
  })

  const focusOnCurrentDay = useRef(() => {
    const timeoutId = setTimeout(() => {
      const currentDay = document.querySelector(
        '.Concorde-DatePicker__Day[tabindex="0"]'
      ) as HTMLDivElement

      currentDay?.focus()
    })

    timeoutRefs.current?.push(timeoutId)
  })

  // Create observer to sync time select height with month select height
  useEffect(() => {
    const timeoutIds = timeoutRefs.current
    const datePicker = datePickerRef.current

    if (!isCalendarOpen || !datePicker || !window.ResizeObserver) {
      return
    }

    const updater = updateTimeSelectHeight.current

    let observer: ResizeObserver | null = null

    try {
      observer = new ResizeObserver(updater)
      const monthContainer = datePicker.querySelector(
        '.react-datepicker__month-container'
      ) as HTMLDivElement

      if (monthContainer) {
        observer.observe(monthContainer)
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('DatePicker: ResizeObserver error', error)
    }

    // Initialize height of time select to be same as month select
    updateTimeSelectHeight.current()
    // Focus on the current active day
    focusOnCurrentDay.current()

    return () => {
      if (observer) {
        observer.disconnect()
      }
      if (timeoutIds.length) {
        timeoutIds.forEach((timeoutId) => clearTimeout(timeoutId))
      }
    }
  }, [isCalendarOpen])

  // Scroll to current time node when calendar is opened
  useEffect(() => {
    if (!isCalendarOpen || !isTimeSelectVisible) {
      // Reset when calendar closes
      hasScrolledToTime.current = false

      return
    }

    if (!hasScrolledToTime.current) {
      scrollToTime.current(date)
      hasScrolledToTime.current = true
    }
  }, [isCalendarOpen, date, isTimeSelectVisible])

  const handleKeyboard = useRef((e: KeyboardEvent) => {
    // Escape button closes the header select
    if (e.key === 'Esc' || e.key === 'Escape') {
      setIsCalendarOpen(false)

      const input = inputRef.current
      const closeButton =
        input?.parentElement?.parentElement?.querySelector('button')

      // Focus on close button
      if (closeButton) {
        closeButton.focus()
      }

      return
    }
  })

  useEffect(() => {
    const handleKeyboardFunc = handleKeyboard.current

    if (!isCalendarOpen) return

    if (!isHeaderSelectOpen) {
      window.addEventListener('keydown', handleKeyboardFunc)
    } else {
      window.removeEventListener('keydown', handleKeyboardFunc)
    }

    return () => {
      if (isHeaderSelectOpen || !isCalendarOpen) {
        window.removeEventListener('keydown', handleKeyboardFunc)
      }
    }
  }, [isHeaderSelectOpen, handleKeyboard, isCalendarOpen])

  return {
    isCalendarOpen,
    datePickerRef,
    setIsCalendarOpen,
    calendarRef,
    inputRef
  }
}

export const useCalenderHeaderEvents = ({
  isMonthSelectOpen,
  isYearSelectOpen,
  closeHeaderSelect
}: {
  isMonthSelectOpen: boolean
  isYearSelectOpen: boolean
  closeHeaderSelect: MutableRefObject<() => void>
}) => {
  const headerSelectRef = useRef<HTMLDivElement>(null)
  const selectGridRef = useRef<HTMLDivElement>(null)
  const isSelectedRef = useRef<HTMLButtonElement>(null)
  // First focusable element in the header
  const firstTrapRef = useRef<Element | null>(null)

  function setTrapElements() {
    // Get all focusable elements in the header
    const allFocusableElements = headerSelectRef.current?.querySelectorAll(
      '[tabindex="0"], li[role="option"], [aria-disabled="false"]'
    )

    // Set the first focusable element as the first trap element
    firstTrapRef.current = allFocusableElements?.[0] || null
  }

  const handleKeyboard = useRef((e: KeyboardEvent) => {
    const path = e?.composedPath()

    // Escape button closes the header select
    if (e.key === 'Esc' || e.key === 'Escape') {
      closeHeaderSelect.current()

      return
    }

    // Trap tabbing forward and backward inside header select
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        // Shift + Tab (tabbing backwards)
        // If the activeElement is the first trap element, focus on the selected element
        if (
          document.activeElement === firstTrapRef.current &&
          isSelectedRef.current
        ) {
          e.preventDefault()
          ;(isSelectedRef.current as HTMLElement)?.focus()

          return
        }

        // If the activeElement is in the list, focus on the selected element
        if (
          path.includes(selectGridRef?.current as HTMLElement) &&
          document.activeElement !== isSelectedRef.current
        ) {
          e.preventDefault()
          ;(isSelectedRef.current as HTMLElement)?.focus()
        }
      } else {
        // Tab (tabbing forward)
        // If the activeElement is the selected element, focus on the first element in the cycle
        if (
          document.activeElement === isSelectedRef.current &&
          firstTrapRef.current
        ) {
          e.preventDefault()
          ;(firstTrapRef.current as HTMLElement)?.focus()

          return
        }

        // If the activeElement is in the list, focus on the selected element
        if (
          path.includes(selectGridRef?.current as HTMLElement) &&
          document.activeElement !== isSelectedRef.current
        ) {
          e.preventDefault()
          ;(isSelectedRef.current as HTMLElement)?.focus()
        }
      }
    }

    // Keyboard Actions in select grid
    if (path.includes(selectGridRef?.current as HTMLElement)) {
      // Up arrow key aids navigation up the list
      if (e.key === 'ArrowUp') {
        const currentListItem = e.target as HTMLElement
        const previousOption = currentListItem?.previousSibling

        if (!previousOption) {
          return
        }
        ;(previousOption as HTMLElement).focus()

        return
      }
      // Down arrow key aids navigation down the list
      if (e.key === 'ArrowDown') {
        const currentListItem = e.target as HTMLElement
        const nextOption = currentListItem?.nextSibling

        if (!nextOption) {
          return
        }
        ;(nextOption as HTMLElement).focus()
      }
    }
  })

  useEffect(() => {
    const handleKeyboardFunc = handleKeyboard.current

    if (isMonthSelectOpen || isYearSelectOpen) {
      setTrapElements()
      // Focus on the selected item when the select is opened
      isSelectedRef.current?.focus()
      // Add event listener to ensure keyboard navigation works
      window.addEventListener('keydown', handleKeyboardFunc)
    }

    return () => {
      if (isMonthSelectOpen || isYearSelectOpen) {
        window.removeEventListener('keydown', handleKeyboardFunc)
      }
    }
  }, [isMonthSelectOpen, isYearSelectOpen])

  return {
    headerSelectRef,
    selectGridRef,
    isSelectedRef
  }
}

export const findNearestAvailableDay = ({
  today,
  disableDays,
  minDate,
  maxDate
}: {
  today: Date
  disableDays?: WeekDays[]
  minDate?: Date
  maxDate?: Date
}): Date => {
  let nextDate = today

  if (maxDate && isAfter(today, maxDate)) {
    return new Date(maxDate)
  }

  if (minDate && isAfter(minDate, today)) {
    nextDate = minDate
  }

  while (
    (disableDays?.includes(nextDate.getDay() as WeekDays) ||
      (maxDate && isAfter(nextDate, maxDate))) &&
    (!maxDate || !isAfter(nextDate, maxDate))
  ) {
    nextDate = addDays(nextDate, 1)
  }

  if (maxDate && isAfter(nextDate, maxDate)) {
    return new Date(maxDate)
  }

  return new Date(nextDate)
}

export const parseDateValue = (value?: Date | string | null) => {
  if (typeof value === 'string') {
    if (isValid(parseISO(value))) {
      return parseISO(value)
    }

    return null
  }

  return value || null
}

export function generateDateMask(locale = 'de', hasTime?: boolean) {
  const date = new Date()

  // Base options for date only (day, month, year)
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }

  // If time should be included, add hour and minute (24-hour format)
  if (hasTime) {
    options.hour = '2-digit'
    options.minute = '2-digit'
    options.hour12 = false
  }

  // Format the date based on locale and options.
  const formatted = new Intl.DateTimeFormat(locale, options).format(date)

  // Replace every digit with '9'
  return formatted.replace(/\d/g, '9')
}

export function getLocaleDateFormat(locale?: string) {
  const localLocale = locale?.includes('en')
    ? 'en-GB'
    : locale || window.navigator.language
  const date = new Date()

  const parts = new Intl.DateTimeFormat(localLocale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).formatToParts(date)

  let format = ''

  parts.forEach((part) => {
    if (part.type === 'day') {
      format += 'dd'
    } else if (part.type === 'month') {
      format += 'MM'
    } else if (part.type === 'year') {
      format += 'yyyy'
    } else if (part.type === 'literal') {
      format += part.value
    }
  })

  return format
}

/**
 * @deprecated
 * @todo Replace usage with useLiveAnnouncer
 */
export const useLiveMessage = (defaultMessage?: string) => {
  const [liveMessage, setLiveMessage] = useState(defaultMessage || '')

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null

    const clearPreviousTimeout = () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }

    if (liveMessage) {
      timeoutId = setTimeout(() => setLiveMessage(''), 3000)
    }

    return () => clearPreviousTimeout()
  }, [liveMessage])

  return { liveMessage, setLiveMessage }
}

export const useDatepickerTranslations = () => {
  const { t } = useTranslation()

  return {
    MONTHS: (month: string) => t(`months.${month}`, month),
    YEAR_SELECT_OPEN: t(
      'datepicker.year_select_open',
      'Year select opened. Use arrow up and arrow down keys to navigate. Press Escape to exit.'
    ),
    YEAR_SELECT_CLOSED: t(
      'datepicker.year_select_closed',
      'Year select closed. Calendar view active.'
    ),
    MONTH_SELECT_OPEN: t(
      'datepicker.month_select_open',
      'Month select opened. Use arrow up and arrow down keys to navigate. Press Escape to exit.'
    ),
    MONTH_SELECT_CLOSED: t(
      'datepicker.month_select_closed',
      'Month select closed. Calendar view active.'
    ),
    ENTERING_HEADER: t(
      'datepicker.entering_header',
      'Entering date picker header'
    ),
    LEAVING_HEADER: t(
      'datepicker.leaving_header',
      'Leaving date picker header'
    ),
    TEXT_FIELD_DATE_HELPER_TEXT: t(
      'datepicker.textfield_helper.date',
      'Enter a 2-digit month, 2-digit day, and 4-digit year'
    ),
    TEXT_FIELD_TIME_HELPER_TEXT: t(
      'datepicker.textfield_helper.time',
      'then space, and add 2-digit hour and 2-digit minute'
    ),
    TEXT_FIELD_NUMBERS_HELPER_TEXT: t(
      'datepicker.textfield_helper.numbers',
      'Only numbers are allowed.'
    ),
    OPEN_DATEPICKER: t('datepicker.open_datepicker', 'Open date picker'),
    SELECT_MONTH: t('datepicker.select_month', 'Select month'),
    SELECT_YEAR: t('datepicker.select_year', 'Select year'),
    PREVIOUS_SELECT_OPTION: (type: DatePickerHeaderSelectProps['type']) =>
      t(`datepicker.previous.${type}`, `Previous ${type}`),
    NEXT_SELECT_OPTION: (type: DatePickerHeaderSelectProps['type']) =>
      t(`datepicker.next.${type}`, `Next ${type}`),
    OPEN_SELECT_OPTIONS: (
      buttonLabel: string | number,
      type: DatePickerHeaderSelectProps['type']
    ) =>
      `${buttonLabel} ${t('datepicker.selected', 'selected')}. ${t(`datepicker.open_select.${type}`, `Click to select ${type}`)}`,
    CANCEL_DATE_SELECTED: t(
      'datepicker.cancel_date',
      'Cancel date selected and close the calendar'
    ),
    ACCEPT_DATE_SELECTED: t(
      'datepicker.accept_date',
      'Accept date selected and close the calendar'
    ),
    CANCEL: t('Cancel'),
    CALENDAR_OPEN: t(
      'datepicker.calendar_open',
      'Calendar opened and Calendar view active. Use arrow up and arrow down keys to navigate between Calendar elements. Press Escape to exit.'
    ),
    CALENDAR_CLOSED: t('datepicker.calendar_closed', 'Calendar closed.')
  }
}

export function isValidDateLength(digits: string, hasTime?: boolean) {
  // Check if the digits are either exactly 8 (date) with no time or 12 (date+time) digits with time
  if ((!hasTime && digits.length !== 8) || (hasTime && digits.length !== 12)) {
    return false
  }

  return true
}

export function isValidDatePatternString(digits: string) {
  if (digits.length !== 8 && digits.length !== 12) return false

  const day = +digits.slice(0, 2)
  const month = +digits.slice(2, 4)
  const year = +digits.slice(4, 8)
  const hour = digits.length === 12 ? +digits.slice(8, 10) : 0
  const min = digits.length === 12 ? +digits.slice(10, 12) : 0

  if (month < 1 || month > 12) return false

  const daysInMonth = new Date(year, month, 0).getDate()

  if (day < 1 || day > daysInMonth) return false

  if (hour < 0 || hour > 23) return false
  if (min < 0 || min > 59) return false

  return true
}

export function parseDatePatternString(digits: string) {
  // Check if the digits are either exactly 8 (date) or 12 (date+time) digits
  if (digits.length !== 8 && digits.length !== 12) return null

  const day = +digits.slice(0, 2)
  const month = +digits.slice(2, 4)
  const year = +digits.slice(4, 8)
  const hour = digits.length === 12 ? +digits.slice(8, 10) : 0
  const min = digits.length === 12 ? +digits.slice(10, 12) : 0

  return new Date(year, month - 1, day, hour, min)
}

export function formatDateToDigits(value: string) {
  return value.replace(/\D/g, '')
}
