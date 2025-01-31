// import the exact needed const to avoid using the full commons package
import classNames from 'classnames'
import { isAfter } from 'date-fns'
import { de } from 'date-fns/locale'
import type { MouseEventHandler } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import DatePickerComponent, { registerLocale } from 'react-datepicker'
import type { ReactDatePickerCustomHeaderProps } from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

import { DatePickerFooter } from './components/DatePickerFooter'
import { DatePickerHeader } from './components/DatePickerHeader'
import { DatePickerTextField } from './components/DatePickerTextField'
import classes from './DatePicker.module.scss'
import {
  LOCALE_MAP,
  type DatePickerCSSProperties,
  type DatePickerProps,
  type WeekDays
} from './types'
import {
  findNearestAvailableDay,
  parseDateValue,
  useCalendarObserver
} from './utils'

registerLocale('de', de)

export const DatePicker = ({
  isDisabled,
  id,
  date: value,
  onChange,
  isTimeSelectVisible = true,
  timeIntervals = 30,
  yearDiff = 600,
  dateFormat,
  timeFormat,
  style,
  calendarBgColor,
  separationColor,
  selectedColor,
  selectedBgColor,
  inputProps,
  label,
  isRequired,
  isError,
  className,
  locale = 'de',
  disableDays,
  minDate,
  maxDate,
  ...props
}: DatePickerProps) => {
  const isMountedRef = useRef(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const [date, setDate] = useState<Date | null>(parseDateValue(value))
  const [isMonthSelectOpen, setIsMonthSelectOpen] = useState(false)
  const [isYearSelectOpen, setIsYearSelectOpen] = useState(false)

  const { isCalendarOpen, datePickerRef, setIsCalendarOpen, calendarRef } =
    useCalendarObserver({ date, isTimeSelectVisible })

  const isHeaderSelectOpen = isMonthSelectOpen || isYearSelectOpen

  const customStyles: DatePickerCSSProperties = {
    ...style,
    '--concorde-datepicker-calendar-bg-color': calendarBgColor,
    '--concorde-datepicker-separation-color': separationColor,
    '--concorde-datepicker-selected-color': selectedColor,
    '--concorde-datepicker-selected-bg-color': selectedBgColor
  }

  function resetMonthYear() {
    setIsMonthSelectOpen(false)
    setIsYearSelectOpen(false)
  }

  function updateDisabledDate(currentDate: Date | null) {
    if (!maxDate && !minDate) {
      return
    }

    let isDateModified = false
    const maxDateAvail = maxDate ? new Date(maxDate) : null
    const minDateAvail = minDate ? new Date(minDate) : null

    if (currentDate && minDateAvail && isAfter(minDateAvail, currentDate)) {
      currentDate.setFullYear(minDateAvail.getFullYear())
      currentDate.setMonth(minDateAvail.getMonth())
      currentDate.setDate(minDateAvail.getDate())
      isDateModified = true
    }

    if (currentDate && maxDateAvail && isAfter(currentDate, maxDateAvail)) {
      currentDate.setFullYear(maxDateAvail.getFullYear())
      currentDate.setMonth(maxDateAvail.getMonth())
      currentDate.setDate(maxDateAvail.getDate())
      isDateModified = true
    }

    return isDateModified
  }

  const handleCalendarOpen = () => {
    if (!maxDate && !minDate && !disableDays?.length) {
      return
    }

    const today = new Date()
    const nearestAvailableDay = findNearestAvailableDay({
      today,
      disableDays,
      maxDate,
      minDate
    })

    // Update the visual selection of the calendar to the nearest date
    if (!date) {
      // If no date is selected and time select is visible, set the hour to 8
      if (isTimeSelectVisible) {
        nearestAvailableDay.setHours(8, 0, 0, 0)
      }
      calendarRef.current?.setPreSelection(nearestAvailableDay)

      return
    }

    // if user selected a date that wasn't enabled in the past, force the date to be updated to the nearest available date
    const currentDate = new Date(date)
    const isModified = updateDisabledDate(currentDate)

    if (isModified) {
      setDate(currentDate)
    }
  }

  function toggleCalendar() {
    if (isDisabled) {
      return
    }
    if (isCalendarOpen) {
      resetMonthYear()
      // Set current date externally
      if (onChange) {
        onChange(date)
      }
    } else {
      handleCalendarOpen()
    }
    setIsCalendarOpen((prev) => !prev)
  }

  function resetDate() {
    const defaultValue = parseDateValue(value)

    // Set date to previous value
    setDate(defaultValue)
    if (onChange) {
      onChange(defaultValue)
    }
    resetMonthYear()
    setIsCalendarOpen(false)
  }

  // Exclude interacting with textfield from closing calendar
  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      const path = e?.composedPath()

      const datePickerTextField = inputRef.current?.parentElement?.parentElement

      if (
        datePickerTextField &&
        datePickerTextField instanceof HTMLElement &&
        path?.includes(datePickerTextField)
      ) {
        return
      }

      setIsMonthSelectOpen(false)
      setIsYearSelectOpen(false)
      setIsCalendarOpen(false)

      // Set current date externally
      if (onChange) {
        onChange(date)
      }
    },
    [setIsCalendarOpen, date, onChange]
  )

  // Resets local state when external value changes
  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true

      return
    }

    if (value) {
      const defaultValue = parseDateValue(value)

      setDate(defaultValue)
    }
  }, [value])

  useEffect(() => {
    const handleWindowBlur = () => {
      if (isCalendarOpen) {
        setIsCalendarOpen(false)
      }
    }

    // Attach blur event listener on window to detect when focus is lost
    window.addEventListener('blur', handleWindowBlur)

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener('blur', handleWindowBlur)
    }
  }, [isCalendarOpen])

  return (
    <div
      className={classNames(
        'Concorde-DatePicker',
        classes.root,
        // Handle custom header select
        isHeaderSelectOpen && [
          'Concorde-DatePicker--Select_View',
          classes.selectView
        ],
        classes.allSelect,
        !isTimeSelectVisible && classes.noTimeSelect,
        className
      )}
      id={id}
      ref={datePickerRef}
      style={customStyles}
    >
      <DatePickerComponent
        {...props}
        calendarClassName={classNames(
          'Concorde-DatePicker__Calendar',
          classes.calendar,
          isHeaderSelectOpen && classes.monthYearSelection
        )}
        customInput={
          <DatePickerTextField
            inputId={id}
            isDisabled={isDisabled}
            isError={isError}
            isRequired={isRequired}
            label={label}
            ref={inputRef}
            toggleCalendar={toggleCalendar}
            {...inputProps}
          />
        }
        customInputRef="id" // Hack to pass ref to DatePickerTextField
        dateFormat={
          dateFormat
            ? dateFormat
            : isTimeSelectVisible
              ? 'dd.MM.yyyy, HH:mm'
              : 'dd.MM.yyyy'
        }
        dayClassName={() => classNames('Concorde-DatePicker__Day', classes.day)}
        disabled={isDisabled}
        dropdownMode="select"
        filterDate={(date: Date) => {
          if (!date) {
            return false
          }

          return !disableDays?.includes(date.getDay() as WeekDays)
        }}
        locale={LOCALE_MAP[locale]}
        maxDate={maxDate}
        minDate={minDate}
        onCalendarClose={resetMonthYear}
        onChange={(newDate: Date | null) => {
          // Set default hours as 8 if date is selected for the first time and time select is visible
          if (!date && isTimeSelectVisible && newDate?.getHours() === 0) {
            newDate.setHours(8, 0, 0, 0)
          }

          // Set date to nearest available date if new date isn't enabled.
          updateDisabledDate(newDate)

          setDate(newDate)
        }}
        onClickOutside={
          handleClickOutside as unknown as MouseEventHandler<HTMLElement>
        }
        onFocus={() => setIsCalendarOpen(true)}
        open={isCalendarOpen}
        popperPlacement="bottom-end"
        ref={calendarRef}
        renderCustomHeader={(props: ReactDatePickerCustomHeaderProps) => (
          <DatePickerHeader
            {...props}
            isMonthSelectOpen={isMonthSelectOpen}
            isTimeSelectVisible={isTimeSelectVisible}
            isYearSelectOpen={isYearSelectOpen}
            setMonthSelectOpen={setIsMonthSelectOpen}
            setYearSelectOpen={setIsYearSelectOpen}
            yearDiff={yearDiff}
          />
        )}
        required={isRequired}
        selected={date}
        shouldCloseOnSelect={false}
        showPopperArrow={false}
        showTimeSelect={isTimeSelectVisible}
        timeClassName={() =>
          classNames(
            'Concorde-DatePicker__Time-list-item',
            classes.timeListItem
          )
        }
        timeFormat={timeFormat || 'HH:mm'} // We have to specify this also for some reason
        timeIntervals={timeIntervals}
        toggleCalendar={toggleCalendar}
        toggleCalendarOnIconClick={true}
        wrapperClassName="Concorde-DatePicker__Wrapper"
      >
        <DatePickerFooter
          closeCalendar={toggleCalendar}
          isHeaderSelectOpen={isHeaderSelectOpen}
          resetDate={resetDate}
        />
      </DatePickerComponent>
    </div>
  )
}
