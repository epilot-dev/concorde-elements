import { addDays, format, isAfter, isValid, parseISO } from 'date-fns'
import { useEffect, useRef, useState } from 'react'
import type { MutableRefObject, RefObject } from 'react'
import type DatePicker from 'react-datepicker'
import { useTranslation } from 'react-i18next'

import type { DatePickerHeaderSelectProps } from './components/types'
import type { WeekDays } from './types'

const MIN_DATEPICKER_SPACE_REQUIRED = 500

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

// Check if datepicker has insufficient space (less than 500px from top and bottom)
export const useInsufficientSpace = ({
  isCalendarOpen,
  datePickerRef
}: {
  isCalendarOpen: boolean
  datePickerRef: RefObject<HTMLDivElement>
}) => {
  const [hasInsufficientSpace, setHasInsufficientSpace] = useState(false)
  const hasSetInsufficientSpaceRef = useRef(false)

  useEffect(() => {
    // Reset the flag and state when calendar is closed
    if (!isCalendarOpen) {
      hasSetInsufficientSpaceRef.current = false
      setHasInsufficientSpace(false)

      return
    }

    const datePicker = datePickerRef.current

    const handleDocumentScroll = () => {
      if (!datePicker || !isCalendarOpen) {
        setHasInsufficientSpace(false)

        return
      }

      const rect = datePicker.getBoundingClientRect()
      const documentHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      )

      // Calculate space from bottom of datepicker to bottom of document
      const spaceToBottom = documentHeight - (rect.bottom + window.scrollY)
      // Calculate space from top of datepicker to top of document
      const spaceToTop = rect.top + window.scrollY

      const insufficient =
        spaceToBottom < MIN_DATEPICKER_SPACE_REQUIRED &&
        spaceToTop < MIN_DATEPICKER_SPACE_REQUIRED

      if (hasSetInsufficientSpaceRef.current) {
        return
      }

      setHasInsufficientSpace(insufficient)
      hasSetInsufficientSpaceRef.current = true
    }

    handleDocumentScroll()

    window.addEventListener('resize', handleDocumentScroll)

    return () => {
      window.removeEventListener('resize', handleDocumentScroll)
    }
  }, [isCalendarOpen, datePickerRef])

  return hasInsufficientSpace
}

/* eslint-disable @typescript-eslint/no-duplicate-enum-values */
enum DateFormat {
  ARABIC_DZ = 'dd-MM-yyyy',
  ARABIC_SA = 'dd/MM/yy',
  ARABIC_UAE = 'dd/MM/yyyy',
  BALTIC = 'dd.MM.yyyy',
  BULGARIAN = 'dd.MM.yyyy',
  CHINESE_SIMPLIFIED = 'yyyy/MM/dd',
  CHINESE_UYGHUR = 'yyyy-M-d',
  CROATIAN_BA = 'dd.MM.yyyy.',
  CZECH = 'dd. MM. yyyy',
  DUTCH = 'dd-MM-yyyy',
  ENGLISH_GLOBAL = 'dd/MM/yyyy',
  ENGLISH_AU = 'dd/MM/yyyy',
  ENGLISH_US = 'dd/MM/yyyy',
  ENGLISH_US_ALTERNATIVE = 'dd/MM/yyyy',
  ESTONIAN = 'dd.MM.yyyy',
  FRENCH = 'yyyy-MM-dd',
  DEUTSCH = 'dd.MM.yyyy',
  HUNGARIAN = 'yyyy. MM. dd.',
  LATVIAN = 'yyyy.MM.dd.',
  LITHUANIAN = 'yy.MM.dd',
  MALAYSIAN = 'dd-MM-yy',
  MONGOLIAN = 'yy.MM.dd',
  RUSSIAN = 'dd.MM.yy',
  SAUDI_RU = 'MM.dd.yyyy',
  SOUTH_KOREAN = 'yyyy. MM. dd',
  SPANISH = 'yyyy/MM/dd',
  UZBEK = 'dd/MM/yyyy'
}

/**
 * Returns date format based on language
 * @param lng e.g. taken from navigator.language
 * @todo We don't need anything neerly this comprehensive. Please ajust to just a couple of formats.
 */
const FORMATS = {
  'af-ZA': DateFormat.SPANISH,
  'am-ET': DateFormat.ENGLISH_US,
  'ar-AE': DateFormat.ARABIC_UAE,
  'ar-BH': DateFormat.ARABIC_UAE,
  'ar-DZ': DateFormat.ARABIC_DZ,
  'ar-EG': DateFormat.ARABIC_UAE,
  'ar-IQ': DateFormat.ARABIC_UAE,
  'ar-JO': DateFormat.ARABIC_UAE,
  'ar-KW': DateFormat.ARABIC_UAE,
  'ar-LB': DateFormat.ARABIC_UAE,
  'ar-LY': DateFormat.ARABIC_UAE,
  'ar-MA': DateFormat.ARABIC_DZ,
  'ar-OM': DateFormat.ARABIC_UAE,
  'ar-QA': DateFormat.ARABIC_UAE,
  'ar-SA': DateFormat.ARABIC_SA,
  'ar-SY': DateFormat.ARABIC_UAE,
  'ar-TN': DateFormat.ARABIC_DZ,
  'ar-YE': DateFormat.ARABIC_UAE,
  'arn-CL': DateFormat.ARABIC_DZ,
  'as-IN': DateFormat.ARABIC_DZ,
  'az-Cyrl-AZ': DateFormat.DEUTSCH,
  'az-Latn-AZ': DateFormat.DEUTSCH,
  'ba-RU': DateFormat.RUSSIAN,
  'be-BY': DateFormat.DEUTSCH,
  'bg-BG': DateFormat.BULGARIAN,
  'bn-BD': DateFormat.MALAYSIAN,
  'bn-IN': DateFormat.MALAYSIAN,
  'bo-CN': DateFormat.CHINESE_SIMPLIFIED,
  'br-FR': DateFormat.ARABIC_UAE,
  'bs-Cyrl-BA': DateFormat.BALTIC,
  'bs-Latn-BA': DateFormat.BALTIC,
  'ca-ES': DateFormat.ARABIC_UAE,
  'co-FR': DateFormat.ARABIC_UAE,
  'cs-CZ': DateFormat.BALTIC,
  'cy-GB': DateFormat.ARABIC_UAE,
  'da-DK': DateFormat.ARABIC_DZ,
  'de-AT': DateFormat.DEUTSCH,
  'de-CH': DateFormat.DEUTSCH,
  'de-DE': DateFormat.DEUTSCH,
  'de-LI': DateFormat.DEUTSCH,
  'de-LU': DateFormat.DEUTSCH,
  'dsb-DE': DateFormat.CZECH,
  'dv-MV': DateFormat.ARABIC_SA,
  'el-GR': DateFormat.ENGLISH_US,
  'en-029': DateFormat.ENGLISH_US_ALTERNATIVE,
  'en-AU': DateFormat.ENGLISH_AU,
  'en-BZ': DateFormat.ARABIC_UAE,
  'en-CA': DateFormat.ARABIC_UAE,
  'en-GB': DateFormat.ARABIC_UAE,
  'en-IE': DateFormat.ARABIC_UAE,
  'en-IN': DateFormat.ARABIC_DZ,
  'en-JM': DateFormat.ARABIC_UAE,
  'en-MY': DateFormat.ENGLISH_US,
  'en-NZ': DateFormat.ENGLISH_AU,
  'en-PH': DateFormat.ENGLISH_GLOBAL,
  'en-SG': DateFormat.ENGLISH_US,
  'en-TT': DateFormat.ARABIC_UAE,
  'en-US': DateFormat.ENGLISH_GLOBAL,
  'en-ZA': DateFormat.SPANISH,
  'en-ZW': DateFormat.ENGLISH_GLOBAL,
  'es-AR': DateFormat.ARABIC_UAE,
  'es-BO': DateFormat.ARABIC_UAE,
  'es-CL': DateFormat.ARABIC_DZ,
  'es-CO': DateFormat.ARABIC_UAE,
  'es-CR': DateFormat.ARABIC_UAE,
  'es-DO': DateFormat.ARABIC_UAE,
  'es-EC': DateFormat.ARABIC_UAE,
  'es-ES': DateFormat.ARABIC_UAE,
  'es-GT': DateFormat.ARABIC_UAE,
  'es-HN': DateFormat.ARABIC_UAE,
  'es-MX': DateFormat.ARABIC_UAE,
  'es-NI': DateFormat.ARABIC_UAE,
  'es-PA': DateFormat.ENGLISH_US_ALTERNATIVE,
  'es-PE': DateFormat.ARABIC_UAE,
  'es-PR': DateFormat.ARABIC_UAE,
  'es-PY': DateFormat.ARABIC_UAE,
  'es-SV': DateFormat.ARABIC_UAE,
  'es-US': DateFormat.ENGLISH_GLOBAL,
  'es-UY': DateFormat.ARABIC_UAE,
  'es-VE': DateFormat.ARABIC_UAE,
  'et-EE': DateFormat.ESTONIAN,
  'eu-ES': DateFormat.SPANISH,
  'fa-IR': DateFormat.ENGLISH_US_ALTERNATIVE,
  'fi-FI': DateFormat.BALTIC,
  'fil-PH': DateFormat.ENGLISH_GLOBAL,
  'fo-FO': DateFormat.ARABIC_DZ,
  'fr-BE': DateFormat.ENGLISH_AU,
  'fr-CA': DateFormat.FRENCH,
  'fr-CH': DateFormat.DEUTSCH,
  'fr-FR': DateFormat.ARABIC_UAE,
  'fr-LU': DateFormat.ARABIC_UAE,
  'fr-MC': DateFormat.ARABIC_UAE,
  'fy-NL': DateFormat.DUTCH,
  'ga-IE': DateFormat.ARABIC_UAE,
  'gd-GB': DateFormat.ARABIC_UAE,
  'gl-ES': DateFormat.ARABIC_SA,
  'gsw-FR': DateFormat.ARABIC_UAE,
  'gu-IN': DateFormat.MALAYSIAN,
  'ha-Latn-NG': DateFormat.ENGLISH_US,
  'he-IL': DateFormat.ARABIC_UAE,
  'hi-IN': DateFormat.ARABIC_DZ,
  'hr-BA': DateFormat.CROATIAN_BA,
  'hr-HR': DateFormat.BALTIC,
  'hsb-DE': DateFormat.CZECH,
  'hu-HU': DateFormat.HUNGARIAN,
  'hy-AM': DateFormat.DEUTSCH,
  'id-ID': DateFormat.ARABIC_UAE,
  'ig-NG': DateFormat.ENGLISH_US,
  'ii-CN': DateFormat.CHINESE_SIMPLIFIED,
  'is-IS': DateFormat.BALTIC,
  'it-CH': DateFormat.DEUTSCH,
  'it-IT': DateFormat.ARABIC_UAE,
  'iu-Cans-CA': DateFormat.ENGLISH_US,
  'iu-Latn-CA': DateFormat.ENGLISH_AU,
  'ja-JP': DateFormat.SPANISH,
  'ka-GE': DateFormat.DEUTSCH,
  'kk-KZ': DateFormat.DEUTSCH,
  'kl-GL': DateFormat.ARABIC_DZ,
  'km-KH': DateFormat.FRENCH,
  'kn-IN': DateFormat.MALAYSIAN,
  'ko-KR': DateFormat.SOUTH_KOREAN,
  'kok-IN': DateFormat.ARABIC_DZ,
  'ky-KG': DateFormat.RUSSIAN,
  'lb-LU': DateFormat.ARABIC_UAE,
  'lo-LA': DateFormat.ARABIC_UAE,
  'lt-LT': DateFormat.LITHUANIAN,
  'lv-LV': DateFormat.LATVIAN,
  'mi-NZ': DateFormat.ARABIC_UAE,
  'mk-MK': DateFormat.DEUTSCH,
  'ml-IN': DateFormat.MALAYSIAN,
  'mn-MN': DateFormat.MONGOLIAN,
  'mn-Mong-CN': DateFormat.CHINESE_SIMPLIFIED,
  'moh-CA': DateFormat.ENGLISH_GLOBAL,
  'mr-IN': DateFormat.ARABIC_DZ,
  'ms-BN': DateFormat.ARABIC_UAE,
  'ms-MY': DateFormat.ARABIC_UAE,
  'mt-MT': DateFormat.ARABIC_UAE,
  'nb-NO': DateFormat.DEUTSCH,
  'ne-NP': DateFormat.ENGLISH_GLOBAL,
  'nl-BE': DateFormat.ENGLISH_AU,
  'nl-NL': DateFormat.DUTCH,
  'nn-NO': DateFormat.DEUTSCH,
  'nso-ZA': DateFormat.SPANISH,
  'oc-FR': DateFormat.ARABIC_UAE,
  'or-IN': DateFormat.MALAYSIAN,
  'pa-IN': DateFormat.MALAYSIAN,
  'pl-PL': DateFormat.DEUTSCH,
  'prs-AF': DateFormat.ARABIC_SA,
  'ps-AF': DateFormat.ARABIC_SA,
  'pt-BR': DateFormat.ENGLISH_US,
  'pt-PT': DateFormat.ARABIC_DZ,
  'qut-GT': DateFormat.ARABIC_UAE,
  'quz-BO': DateFormat.ARABIC_UAE,
  'quz-EC': DateFormat.ARABIC_UAE,
  'quz-PE': DateFormat.ARABIC_UAE,
  'rm-CH': DateFormat.ARABIC_UAE,
  'ro-RO': DateFormat.DEUTSCH,
  'ru-RU': DateFormat.DEUTSCH,
  'rw-RW': DateFormat.ENGLISH_GLOBAL,
  'sa-IN': DateFormat.ARABIC_DZ,
  'sah-RU': DateFormat.SAUDI_RU,
  'se-FI': DateFormat.BALTIC,
  'se-NO': DateFormat.DEUTSCH,
  'se-SE': DateFormat.FRENCH,
  'si-LK': DateFormat.FRENCH,
  'sk-SK': DateFormat.CZECH,
  'sl-SI': DateFormat.BALTIC,
  'sma-NO': DateFormat.DEUTSCH,
  'sma-SE': DateFormat.FRENCH,
  'smj-NO': DateFormat.DEUTSCH,
  'smj-SE': DateFormat.FRENCH,
  'smn-FI': DateFormat.BALTIC,
  'sms-FI': DateFormat.BALTIC,
  'sq-AL': DateFormat.FRENCH,
  'sr-Cyrl-BA': DateFormat.BALTIC,
  'sr-Cyrl-CS': DateFormat.BALTIC,
  'sr-Cyrl-ME': DateFormat.BALTIC,
  'sr-Cyrl-RS': DateFormat.BALTIC,
  'sr-Latn-BA': DateFormat.BALTIC,
  'sr-Latn-CS': DateFormat.BALTIC,
  'sr-Latn-ME': DateFormat.BALTIC,
  'sr-Latn-RS': DateFormat.BALTIC,
  'sv-FI': DateFormat.BALTIC,
  'sv-SE': DateFormat.FRENCH,
  'sw-KE': DateFormat.ENGLISH_GLOBAL,
  'syr-SY': DateFormat.ARABIC_UAE,
  'ta-IN': DateFormat.ARABIC_DZ,
  'te-IN': DateFormat.MALAYSIAN,
  'tg-Cyrl-TJ': DateFormat.RUSSIAN,
  'th-TH': DateFormat.ENGLISH_US,
  'tk-TM': DateFormat.RUSSIAN,
  'tn-ZA': DateFormat.SPANISH,
  'tr-TR': DateFormat.DEUTSCH,
  'tt-RU': DateFormat.DEUTSCH,
  'tzm-Latn-DZ': DateFormat.ARABIC_DZ,
  'ug-CN': DateFormat.CHINESE_UYGHUR,
  'uk-UA': DateFormat.DEUTSCH,
  'ur-PK': DateFormat.ARABIC_UAE,
  'uz-Cyrl-UZ': DateFormat.DEUTSCH,
  'uz-Latn-UZ': DateFormat.UZBEK,
  'vi-VN': DateFormat.ARABIC_UAE,
  'wo-SN': DateFormat.ARABIC_UAE,
  'xh-ZA': DateFormat.SPANISH,
  'yo-NG': DateFormat.ENGLISH_US,
  'zh-CN': DateFormat.CHINESE_SIMPLIFIED,
  'zh-HK': DateFormat.ENGLISH_US,
  'zh-MO': DateFormat.ENGLISH_US,
  'zh-SG': DateFormat.ENGLISH_US,
  'zh-TW': DateFormat.CHINESE_SIMPLIFIED,
  'zu-ZA': DateFormat.SPANISH
}

export const getLocaleDateString = (lng: string, showTime?: boolean) => {
  const baseFormat =
    lng in FORMATS ? FORMATS[lng as keyof typeof FORMATS] : DateFormat.DEUTSCH

  return showTime ? `${baseFormat}, HH:mm` : baseFormat
}
