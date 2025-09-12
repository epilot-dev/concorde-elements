import type { Locale } from 'date-fns'
import { enGB, de, fr } from 'date-fns/locale'
import type { CSSProperties } from 'react'
import type { DatePickerProps as DatePickerPropsBase } from 'react-datepicker'

import type { InputProps } from '..'

export const LOCALES = ['en', 'de', 'fr'] as const
export type SupportedLocales = (typeof LOCALES)[number]

export const LOCALE_MAP: Record<SupportedLocales, Locale> = {
  en: enGB,
  de,
  fr
} as const

export type DatePickerProps = Omit<
  DatePickerPropsBase,
  | 'toggleCalendarOnIconClick'
  | 'showTimeSelectOnly'
  | 'ref'
  | 'disabled'
  | 'customInput'
  | 'customInputRef'
  | 'open'
  | 'selected'
> & {
  /**
   * Sets the value of the date picker
   */
  onChange: (date: Date | null) => void

  /**
   * The value of the date picker
   */
  date?: Date | null

  /**
   * Sets the date picker as disabled
   */
  isDisabled?: boolean

  /**
   * Id of the date picker
   */
  id?: string

  /**
   * Class name of the date picker
   */
  className?: string

  /**
   * Hides the time select
   *
   * Defaults to true
   */
  isTimeSelectVisible?: boolean

  /**
   * The plus and minus difference in years for the year select
   *
   * Defaults to 600
   */
  yearDiff?: number

  /**
   * Custom styles
   */
  style?: CSSProperties

  /**
   * Custom background color of the calendar
   */
  calendarBgColor?: string

  /**
   * Custom color of the separation line between the date and time select
   */
  separationColor?: string

  /**
   * Custom selected color of the day and time
   */
  selectedColor?: string

  /**
   * Custom selected background color of the day and time
   */
  selectedBgColor?: string

  /**
   * Props for the Concorde TextField component.
   */
  inputProps?: InputProps

  /**
   * Sets the label of the input element.
   */
  label?: string

  /**
   * Sets the aria label of the input element.
   */
  ariaLabel?: string

  /**
   * Treats the input element as required.
   */
  isRequired?: boolean

  /**
   * Turns on the error state of the input element.
   */
  isError?: boolean

  /**
   * Sets the locale of the date picker.
   */
  locale: SupportedLocales

  /**
   * Disabled days of the week
   */
  disableDays?: WeekDays[]
  /**
   * Minimum date
   */
  minDate?: Date
  /**
   * Maximum date
   */
  maxDate?: Date
  /**
   * Opens the calendar to a specific date
   */
  openToDate?: Date

  /**
   * Maximum year to show in the year dropdown
   */
  maxYear?: number
}

export type WeekDays = 0 | 1 | 2 | 3 | 4 | 5 | 6

export interface DatePickerCSSProperties extends CSSProperties {
  '--concorde-datepicker-calendar-bg-color'?: string
  '--concorde-datepicker-day-color'?: string
  '--concorde-datepicker-day-name-color'?: string
  '--concorde-datepicker-separation-color'?: string
  '--concorde-datepicker-selected-color'?: string
  '--concorde-datepicker-selected-bg-color'?: string
  '--concorde-datepicker-header-navigation-icon-color'?: string
  '--concorde-datepicker-border-radius'?: string
}
