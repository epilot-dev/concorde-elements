import type { Dispatch, SetStateAction } from 'react'
import type { ReactDatePickerCustomHeaderProps } from 'react-datepicker'

import type { InputProps } from '../..'
import type { DatePickerProps, LOCALES } from '../types'

export type DatePickerTextFieldProps = Omit<InputProps, 'id'> & {
  /**
   * Toggle the open state of the calendar
   */
  toggleCalendar: () => void

  /**
   * The id of the input field
   */
  inputId?: string

  /**
   * The locale of the date picker
   */
  locale: (typeof LOCALES)[number]

  /**
   * The open state of the time select
   */
  hasTime?: boolean

  /**
   * The read only state of the date picker
   */
  readOnly?: boolean
}

export type DatePickerHeaderProps = ReactDatePickerCustomHeaderProps & {
  /**
   * The open state of the month select
   */
  isMonthSelectOpen: boolean

  /**
   * The open state of the year select
   */
  isYearSelectOpen: boolean

  /**
   * Sets the open state of the month select
   */
  setMonthSelectOpen: Dispatch<SetStateAction<boolean>>

  /**
   * Sets the open state of the year select
   */
  setYearSelectOpen: Dispatch<SetStateAction<boolean>>

  /**
   * The plus and minus difference in years for the year select
   */
  yearDiff: NonNullable<DatePickerProps['yearDiff']>

  /**
   * The open state of the time select
   */
  isTimeSelectVisible?: boolean
}

export type DatePickerHeaderSelectProps = {
  /**
   * The open state of the header select
   */
  isHeaderSelectOpen: boolean

  /**
   * The disabled state of the previous button
   */
  prevButtonDisabled: boolean

  /**
   * Reduces the selected type
   */
  decrease: () => void

  /**
   * The open state of the header select
   */
  isSelectOpen: boolean

  /**
   * Toggles the open state of the header select
   */
  toggleSelect: () => void

  /**
   * Increases the selected type
   */
  increase: () => void

  /**
   * The disabled state of the next button
   */
  nextButtonDisabled: boolean

  /**
   * The label of the select button
   */
  buttonLabel: string | number

  /**
   * The type of the select button
   */
  type: string
}

export type DatePickerHeaderSelectGridProps = {
  /**
   *  The open state of the grid
   */
  isSelectOpen: boolean
}

export type DatePickerHeaderSelectGridItemProps = {
  /**
   * The value of the grid item
   */
  item: string | number

  /**
   * onClick handler for the grid item
   */
  onClick: () => void

  /**
   * The selected state of the grid item
   */
  isSelected: boolean
}

export type DatePickerFooterProps = {
  /**
   * The open state of the header select
   */
  isHeaderSelectOpen: boolean

  /**
   * Resets the date picker and closes the calendar
   */
  resetDate: () => void

  /**
   * Close calendar
   */
  closeCalendar: () => void
}
