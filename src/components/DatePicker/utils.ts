import { addDays, format, isAfter, isValid, parseISO } from 'date-fns'
import { useEffect, useRef, useState } from 'react'
import type { MutableRefObject } from 'react'
import type DatePicker from 'react-datepicker'

import type { WeekDays } from './types'

export const useCalendarObserver = ({
  date = null,
  isTimeSelectVisible
}: {
  date: Date | null
  isTimeSelectVisible?: boolean
}) => {
  const monthHeightRef = useRef(0)
  const datePickerRef = useRef<HTMLDivElement>(null)
  const calendarRef = useRef<DatePicker>(null)
  // Manage scrolling to current date hour when calendar opens
  const hasScrolledToTime = useRef(false)

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
    setTimeout(() => {
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

      const nextElement = timeNode?.nextElementSibling

      if (nextElement) {
        nextElement.scrollIntoView({
          block: 'nearest'
        })
      } else {
        timeNode?.scrollIntoView({
          block: 'nearest'
        })
      }
    })
  })

  // Create observer to sync time select height with month select height
  useEffect(() => {
    const datePicker = datePickerRef.current

    if (!isCalendarOpen || !datePicker) {
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

    return () => {
      if (observer) {
        observer.disconnect()
      }
    }
  }, [isCalendarOpen])

  // Initialize height of time select to be same as month select
  useEffect(() => {
    if (!isCalendarOpen) {
      // Reset when calendar closes
      hasScrolledToTime.current = false

      return
    }
    updateTimeSelectHeight.current()
  }, [isCalendarOpen])

  // Scroll to current time node when calendar is opened
  useEffect(() => {
    if (!isCalendarOpen || !isTimeSelectVisible) {
      return
    }

    if (!hasScrolledToTime.current) {
      scrollToTime.current(date)
      hasScrolledToTime.current = true
    }
  }, [isCalendarOpen, date, isTimeSelectVisible])

  return { isCalendarOpen, datePickerRef, setIsCalendarOpen, calendarRef }
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
  const localLocale = locale || window.navigator.language
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
