import classNames from 'classnames'
import { getMonth, getYear } from 'date-fns'
import { forwardRef, useRef } from 'react'
import type { PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '../../Button'
import { Icon } from '../../Icon'
import { IconButton } from '../../IconButton'
import { useCalenderHeaderEvents } from '../utils'

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
  isTimeSelectVisible
}: DatePickerHeaderProps) => {
  const { t } = useTranslation()
  const isHeaderSelectOpen = isMonthSelectOpen || isYearSelectOpen
  const closeHeaderSelect = useRef(() => {
    setMonthSelectOpen(false)
    setYearSelectOpen(false)
  })

  const { headerSelectRef, selectGridRef, isSelectedRef } =
    useCalenderHeaderEvents({
      isMonthSelectOpen,
      isYearSelectOpen,
      closeHeaderSelect
    })

  const years = Array.from(
    { length: yearDiff * 2 },
    (_, i) => new Date().getFullYear() - yearDiff + i
  )

  function toggleMonthSelect() {
    setYearSelectOpen(false)
    setMonthSelectOpen((prev) => !prev)
  }

  function toggleYearSelect() {
    setMonthSelectOpen(false)
    setYearSelectOpen((prev) => !prev)
  }

  return (
    <div
      className={classNames(
        'Concorde-DatePicker__Header',
        classes.header,
        isHeaderSelectOpen && classes.headerPadded
      )}
      ref={headerSelectRef}
    >
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
          buttonLabel={t(
            `months.${months[getMonth(date)]}`,
            months[getMonth(date)]
          )}
          decrease={decreaseMonth}
          increase={increaseMonth}
          isHeaderSelectOpen={isHeaderSelectOpen}
          isSelectOpen={isMonthSelectOpen}
          nextButtonDisabled={nextMonthButtonDisabled}
          prevButtonDisabled={prevMonthButtonDisabled}
          toggleSelect={toggleMonthSelect}
          type="month"
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
        />
      </div>

      <div ref={selectGridRef}>
        {/* Month Select Grid */}
        <DatePickerHeaderSelectGrid isSelectOpen={isMonthSelectOpen}>
          {months.map((month, index) => {
            const isSelected = getMonth(date) === index

            return (
              <DatePickerHeaderSelectGridItem
                isSelected={isSelected}
                item={t(`months.${month}`)}
                key={month}
                onClick={() => {
                  changeMonth(index)
                  toggleMonthSelect()
                }}
                ref={isSelected ? isSelectedRef : undefined}
              />
            )
          })}
        </DatePickerHeaderSelectGrid>

        {/* Year Select Grid */}
        <DatePickerHeaderSelectGrid isSelectOpen={isYearSelectOpen}>
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
  buttonLabel
}: DatePickerHeaderSelectProps) {
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
        aria-label={`Previous ${type}`}
        className={classNames(
          'Concorde-DatePicker__Header-Icon-Button',
          classes.selectIcon,
          classes.selectIconButton,
          !isHeaderSelectOpen && classes.selectIconVisible,
          prevButtonDisabled && classes.disabledSelectIcon
        )}
        isDisabled={prevButtonDisabled}
        name="chevron_left"
        onClick={!prevButtonDisabled ? decrease : undefined}
        size="24px"
      />
      <Button
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
        onClick={toggleSelect}
        rightIcon={
          <Icon
            className={classNames(
              classes.selectIcon,
              (!isHeaderSelectOpen || isSelectOpen) && classes.selectIconVisible
            )}
            name="arrow_drop_down"
            size="24px"
          />
        }
        variant="bare"
      />
      <IconButton
        aria-disabled={isHeaderSelectOpen || nextButtonDisabled}
        aria-label={`Next ${type}`}
        className={classNames(
          'Concorde-DatePicker__Header-Icon-Button',
          classes.selectIcon,
          classes.selectIconButton,
          !isHeaderSelectOpen && classes.selectIconVisible,
          nextButtonDisabled && classes.disabledSelectIcon
        )}
        isDisabled={nextButtonDisabled}
        name="chevron_right"
        onClick={!nextButtonDisabled ? increase : undefined}
        size="24px"
      />
    </div>
  )
}

function DatePickerHeaderSelectGrid({
  children,
  isSelectOpen
}: PropsWithChildren<DatePickerHeaderSelectGridProps>) {
  if (!isSelectOpen) {
    return null
  }

  return (
    <div
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
