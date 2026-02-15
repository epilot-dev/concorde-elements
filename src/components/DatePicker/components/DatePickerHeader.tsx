import classNames from 'classnames'
import { getMonth, getYear } from 'date-fns'
import { forwardRef, useCallback, useRef } from 'react'
import type { PropsWithChildren } from 'react'

import srClasses from '../../../accessibility.module.scss'
import { Button } from '../../Button'
import { Icon } from '../../Icon'
import { IconButton } from '../../IconButton'
import {
  useCalenderHeaderEvents,
  useDatepickerTranslations,
  useLiveMessage
} from '../utils'

import classes from './DatePickerHeader.module.scss'
import type {
  DatePickerHeaderProps,
  DatePickerHeaderSelectGridItemProps,
  DatePickerHeaderSelectGridProps,
  DatePickerHeaderSelectProps
} from './types'

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

export const DatePickerHeader = ({
  date,
  changeYear,
  changeMonth,
  decreaseMonth,
  increaseMonth,
  increaseYear,
  decreaseYear,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
  prevYearButtonDisabled,
  nextYearButtonDisabled,
  isMonthSelectOpen,
  isYearSelectOpen,
  setMonthSelectOpen,
  setYearSelectOpen,
  yearDiff = 600,
  isTimeSelectVisible,
  maxYear
}: DatePickerHeaderProps) => {
  const {
    MONTHS,
    YEAR_SELECT_OPEN,
    MONTH_SELECT_OPEN,
    YEAR_SELECT_CLOSED,
    MONTH_SELECT_CLOSED,
    SELECT_MONTH,
    SELECT_YEAR,
    ENTERING_HEADER,
    LEAVING_HEADER
  } = useDatepickerTranslations()
  const isHeaderSelectOpen = isMonthSelectOpen || isYearSelectOpen
  const activeSelectButton = useRef<HTMLButtonElement | null>(null)

  // State for live announcements
  const { liveMessage, setLiveMessage } = useLiveMessage()

  const closeHeaderSelect = useRef(() => {
    setMonthSelectOpen(false)
    setYearSelectOpen(false)
    setLiveMessage(isMonthSelectOpen ? MONTH_SELECT_CLOSED : YEAR_SELECT_CLOSED)
    activeSelectButton.current?.focus()
  })

  const { headerSelectRef, selectGridRef, isSelectedRef } =
    useCalenderHeaderEvents({
      isMonthSelectOpen,
      isYearSelectOpen,
      closeHeaderSelect
    })

  const currentYear = new Date().getFullYear()
  const startYear = currentYear - yearDiff
  const endYear = maxYear || currentYear + yearDiff
  const years = Array.from(
    { length: endYear - startYear + 1 },
    (_, i) => startYear + i
  )

  function toggleMonthSelect() {
    setYearSelectOpen(false)

    setMonthSelectOpen((prev) => {
      const newState = !prev

      // Announce the change in mode
      setLiveMessage(newState ? MONTH_SELECT_OPEN : MONTH_SELECT_CLOSED)

      return newState
    })
  }

  function toggleYearSelect() {
    setMonthSelectOpen(false)
    setYearSelectOpen((prev) => {
      const newState = !prev

      setLiveMessage(newState ? YEAR_SELECT_OPEN : YEAR_SELECT_CLOSED)

      return newState
    })
  }

  const updateActiveSelectButton = useRef(() => {
    activeSelectButton.current = document.activeElement as HTMLButtonElement
  })

  const handleFocus = useCallback(
    (e) => {
      // If the header container does not contain the previously focused element,
      // then we are entering the header.
      if (!headerSelectRef.current?.contains(e.relatedTarget)) {
        setLiveMessage(ENTERING_HEADER)
      }
    },
    [headerSelectRef, setLiveMessage, ENTERING_HEADER]
  )

  const handleBlur = useCallback(
    (e) => {
      // When focus leaves the header container (and is not still within it)
      // then announce that the header is being left.
      if (!headerSelectRef.current?.contains(e.relatedTarget)) {
        setLiveMessage(LEAVING_HEADER)
      }
    },
    [headerSelectRef, setLiveMessage, LEAVING_HEADER]
  )

  return (
    <div
      className={classNames(
        'Concorde-DatePicker__Header',
        classes.header,
        isHeaderSelectOpen && classes.headerPadded
      )}
      onBlur={handleBlur}
      onFocus={handleFocus}
      ref={headerSelectRef}
    >
      {/* ARIA live region for announcements */}
      <div aria-live="polite" className={srClasses['sr-only']} role="status">
        {liveMessage}
      </div>

      <div
        className={classNames(
          'Concorde-DatePicker__Header-Select-Container',
          classes.selectContainer,
          isHeaderSelectOpen && classes.selectContainerPadded,
          !isTimeSelectVisible && classes.hideTime
        )}
      >
        {/* Month Select */}
        <DatePickerHeaderSelect
          buttonLabel={MONTHS(months[getMonth(date)])}
          decrease={decreaseMonth}
          increase={increaseMonth}
          isHeaderSelectOpen={isHeaderSelectOpen}
          isSelectOpen={isMonthSelectOpen}
          nextButtonDisabled={nextMonthButtonDisabled}
          prevButtonDisabled={prevMonthButtonDisabled}
          toggleSelect={toggleMonthSelect}
          type="month"
          updateActiveSelectButton={updateActiveSelectButton.current}
        />
        {/* Year Select */}
        <DatePickerHeaderSelect
          buttonLabel={getYear(date)}
          decrease={decreaseYear}
          increase={increaseYear}
          isHeaderSelectOpen={isHeaderSelectOpen}
          isSelectOpen={isYearSelectOpen}
          nextButtonDisabled={nextYearButtonDisabled}
          prevButtonDisabled={prevYearButtonDisabled}
          toggleSelect={toggleYearSelect}
          type="year"
          updateActiveSelectButton={updateActiveSelectButton.current}
        />
      </div>

      <div ref={selectGridRef}>
        {/* Month Select Grid */}
        <DatePickerHeaderSelectGrid
          aria-label={SELECT_MONTH}
          isSelectOpen={isMonthSelectOpen}
        >
          {months.map((month, index) => {
            const isSelected = getMonth(date) === index

            return (
              <DatePickerHeaderSelectGridItem
                isSelected={isSelected}
                item={MONTHS(month)}
                key={month}
                onClick={() => {
                  changeMonth(index)
                  toggleMonthSelect()
                  activeSelectButton.current?.focus()
                }}
                ref={isSelected ? isSelectedRef : undefined}
              />
            )
          })}
        </DatePickerHeaderSelectGrid>

        {/* Year Select Grid */}
        <DatePickerHeaderSelectGrid
          aria-label={SELECT_YEAR}
          isSelectOpen={isYearSelectOpen}
        >
          {years.map((year) => {
            const isSelected = getYear(date) === year

            return (
              <DatePickerHeaderSelectGridItem
                isSelected={isSelected}
                item={year}
                key={year}
                onClick={() => {
                  changeYear(year)
                  toggleYearSelect()
                  activeSelectButton.current?.focus()
                }}
                ref={isSelected ? isSelectedRef : undefined}
              />
            )
          })}
        </DatePickerHeaderSelectGrid>
      </div>
    </div>
  )
}

function DatePickerHeaderSelect({
  type,
  isHeaderSelectOpen,
  prevButtonDisabled,
  decrease,
  isSelectOpen,
  toggleSelect,
  increase,
  nextButtonDisabled,
  buttonLabel,
  updateActiveSelectButton
}: DatePickerHeaderSelectProps) {
  const { PREVIOUS_SELECT_OPTION, NEXT_SELECT_OPTION, OPEN_SELECT_OPTIONS } =
    useDatepickerTranslations()

  return (
    <div
      className={classNames(
        'Concorde-DatePicker__Header-Month-Year-Select-Container',
        classes.monthYearSelectContainer,
        isHeaderSelectOpen && classes.selectFullWidth
      )}
    >
      <IconButton
        aria-disabled={isHeaderSelectOpen || prevButtonDisabled}
        aria-label={PREVIOUS_SELECT_OPTION(type)}
        className={classNames(
          'Concorde-DatePicker__Header-Icon-Button',
          classes.selectIcon,
          classes.selectIconButton,
          !isHeaderSelectOpen && classes.selectIconVisible,
          prevButtonDisabled && classes.disabledSelectIcon
        )}
        color="var(--concorde-datepicker-header-navigation-icon-color, var(--concorde-secondary-text))"
        isDisabled={prevButtonDisabled}
        name="chevron_left"
        onClick={!prevButtonDisabled ? decrease : undefined}
      />
      <Button
        aria-expanded={isHeaderSelectOpen}
        aria-haspopup="listbox"
        aria-label={OPEN_SELECT_OPTIONS(buttonLabel, type)}
        className={classNames(
          'Concorde-DatePicker__Header-Button',
          classes.headerSelectButtonDefault,
          isHeaderSelectOpen && classes.headerSelectButton,
          isSelectOpen && [
            'Concorde-DatePicker__Header-Active-Button',
            classes.activeHeaderSelectButton
          ]
        )}
        label={buttonLabel}
        onClick={() => {
          updateActiveSelectButton()
          toggleSelect()
        }}
        rightIcon={
          <Icon
            className={classNames(
              classes.selectIcon,
              classes.selectIconSize,
              (!isHeaderSelectOpen || isSelectOpen) && classes.selectIconVisible
            )}
            name="arrow_drop_down"
          />
        }
        variant="bare"
      />
      <IconButton
        aria-disabled={isHeaderSelectOpen || nextButtonDisabled}
        aria-label={NEXT_SELECT_OPTION(type)}
        className={classNames(
          'Concorde-DatePicker__Header-Icon-Button',
          classes.selectIcon,
          classes.selectIconButton,
          !isHeaderSelectOpen && classes.selectIconVisible,
          nextButtonDisabled && classes.disabledSelectIcon
        )}
        color="var(--concorde-datepicker-header-navigation-icon-color, var(--concorde-secondary-text))"
        isDisabled={nextButtonDisabled}
        name="chevron_right"
        onClick={!nextButtonDisabled ? increase : undefined}
      />
    </div>
  )
}

function DatePickerHeaderSelectGrid({
  children,
  isSelectOpen,
  ...rest
}: PropsWithChildren<DatePickerHeaderSelectGridProps>) {
  if (!isSelectOpen) {
    return null
  }

  return (
    <div
      aria-label={rest?.['aria-label']}
      className={classNames(
        'Concorde-DatePicker__Header-Select-Grid',
        classes.selectGrid
      )}
      role="listbox"
    >
      {children}
    </div>
  )
}

const DatePickerHeaderSelectGridItem = forwardRef<
  HTMLButtonElement,
  DatePickerHeaderSelectGridItemProps
>(({ item, onClick, isSelected }, ref) => {
  return (
    <Button
      aria-selected={isSelected}
      className={classNames(
        'Concorde-DatePicker__Header-Select-Item-Button',
        classes.selectItemButton,
        isSelected && classes.activeSelectItemButton
      )}
      label={item}
      leftIcon={
        <Icon
          className={classNames(
            classes.selectIcon,
            isSelected && classes.selectIconVisible
          )}
          name="check"
          size="24px"
        />
      }
      onClick={onClick}
      ref={ref}
      role="option"
      // Only allow tabbing to the selected item to avoid noise, keyboard navigation will handle the rest
      tabIndex={isSelected ? 0 : -1}
      variant="bare"
    />
  )
})

DatePickerHeaderSelectGridItem.displayName = 'DatePickerHeaderSelectGridItem'
