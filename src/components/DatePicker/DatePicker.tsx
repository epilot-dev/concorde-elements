import { autoPlacement } from '@floating-ui/dom'
import classNames from 'classnames'
import { isAfter } from 'date-fns'
import { de, enGB, fr } from 'date-fns/locale'
import { useCallback, useEffect, useRef, useState } from 'react'
import DatePickerComponent, { registerLocale } from 'react-datepicker'
import type { ReactDatePickerCustomHeaderProps } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.module.css'

import srClasses from '../../accessibility.module.scss'

import { DatePickerFooter } from './components/DatePickerFooter'
import { DatePickerHeader } from './components/DatePickerHeader'
import { DatePickerTextField } from './components/DatePickerTextField'
import classes from './DatePicker.module.scss'
import { LOCALE_MAP } from './types'
import type {
  SupportedLocales,
  DatePickerCSSProperties,
  DatePickerProps,
  WeekDays
} from './types'
import {
  findNearestAvailableDay,
  getLocaleDateString,
  parseDateValue,
  useCalendarObserver,
  useDatepickerTranslations,
  useInsufficientSpace,
  useLiveMessage
} from './utils'

registerLocale('de', de)
registerLocale('en', enGB)
registerLocale('fr', fr)

export const DatePicker = ({
  isDisabled,
  ariaLabel,
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
  openToDate,
  ...props
}: DatePickerProps) => {
  const isMountedRef = useRef(false)
  const { CALENDAR_OPEN, CALENDAR_CLOSED } = useDatepickerTranslations()

  const [date, setDate] = useState<Date | null>(parseDateValue(value))
  const [isMonthSelectOpen, setIsMonthSelectOpen] = useState(false)
  const [isYearSelectOpen, setIsYearSelectOpen] = useState(false)

  // State for live announcements
  const { liveMessage, setLiveMessage } = useLiveMessage(CALENDAR_OPEN)
  const isHeaderSelectOpen = isMonthSelectOpen || isYearSelectOpen

  const {
    isCalendarOpen,
    datePickerRef,
    setIsCalendarOpen,
    calendarRef,
    inputRef
  } = useCalendarObserver({ date, isTimeSelectVisible, isHeaderSelectOpen })

  // Check for insufficient vertical space for the calendar
  const hasInsufficientVerticalSpace = useInsufficientSpace({
    isCalendarOpen,
    datePickerRef
  })

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
      setTimeout(() => setLiveMessage(CALENDAR_CLOSED))
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

  // Handles date change from textfield
  function onDateChange(date: Date | null) {
    if (!date) {
      setDate(null)
    }
    if (onChange) {
      onChange(date)
    }
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

  function getDateFormat(isTimeSelectVisible: boolean) {
    return getLocaleDateString(locale, isTimeSelectVisible)
  }

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
        hasInsufficientVerticalSpace && classes.verticalSpaceInsufficient,
        className
      )}
      id={id}
      ref={datePickerRef}
      style={customStyles}
    >
      {/* ARIA live region for announcements */}
      <div aria-live="polite" className={srClasses['sr-only']} role="status">
        {liveMessage}
      </div>
      <DatePickerComponent
        {...props}
        calendarClassName={classNames(
          'Concorde-DatePicker__Calendar',
          classes.calendar,
          isHeaderSelectOpen && classes.monthYearSelection
        )}
        customInput={
          <DatePickerTextField
            aria-label={ariaLabel}
            hasTime={isTimeSelectVisible}
            inputId={id}
            isDisabled={isDisabled}
            isError={isError}
            isRequired={isRequired}
            label={label}
            locale={locale}
            onDateChange={onDateChange}
            ref={inputRef}
            toggleCalendar={toggleCalendar}
            {...inputProps}
          />
        }
        // Hack to pass ref to DatePickerTextField
        customInputRef="id"
        dateFormat={
          dateFormat ? dateFormat : getDateFormat(isTimeSelectVisible)
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
        locale={LOCALE_MAP[locale as SupportedLocales]}
        maxDate={maxDate}
        minDate={minDate}
        onBlur={() => {
          if (isCalendarOpen) {
            setIsCalendarOpen(false)
          }
        }}
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
        onClickOutside={handleClickOutside}
        open={isCalendarOpen}
        openToDate={!value ? openToDate : undefined}
        popperModifiers={[
          autoPlacement({
            allowedPlacements: ['bottom-end', 'top-end', 'bottom'],
            crossAxis: true,
            alignment: 'end'
          })
        ]}
        popperPlacement="bottom-end"
        preventOpenOnFocus
        ref={calendarRef}
        renderCustomHeader={(props: ReactDatePickerCustomHeaderProps) => (
          <DatePickerHeader
            {...props}
            isMonthSelectOpen={isMonthSelectOpen}
            isTimeSelectVisible={isTimeSelectVisible}
            isYearSelectOpen={isYearSelectOpen}
            maxYear={maxDate ? maxDate.getFullYear() : undefined}
            setMonthSelectOpen={setIsMonthSelectOpen}
            setYearSelectOpen={setIsYearSelectOpen}
            yearDiff={yearDiff}
          />
        )}
        required={isRequired}
        selected={date}
        selectsMultiple={undefined}
        selectsRange={undefined}
        shouldCloseOnSelect={false}
        showMonthYearDropdown={undefined}
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
