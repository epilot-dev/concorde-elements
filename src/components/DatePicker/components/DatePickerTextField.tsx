import classNames from 'classnames'
import { isValid } from 'date-fns'
import { forwardRef } from 'react'

import type { PatternInputProps } from '../../'
import { PatternInput, IconButton } from '../../'
import srClasses from '../../../accessibility.module.scss'
import {
  generateDateMask,
  isValidDateLength,
  isValidDatePatternString,
  parseDatePatternString,
  useDatepickerTranslations
} from '../utils'

import classes from './DatePickerTextField.module.scss'
import type { DatePickerTextFieldProps } from './types'

export const DatePickerTextField = forwardRef<
  HTMLInputElement,
  DatePickerTextFieldProps
>((props, ref) => {
  const {
    toggleCalendar,
    inputId: id,
    locale,
    hasTime,
    readOnly,
    isDisabled,
    label,
    onDateChange,
    value,
    defaultValue,
    ...rest
  } = props
  const {
    TEXT_FIELD_DATE_HELPER_TEXT,
    TEXT_FIELD_TIME_HELPER_TEXT,
    TEXT_FIELD_NUMBERS_HELPER_TEXT,
    OPEN_DATEPICKER
  } = useDatepickerTranslations()

  const mask = generateDateMask(locale, hasTime)

  function getHelperText(hasTime?: boolean) {
    return `${TEXT_FIELD_DATE_HELPER_TEXT} ${
      hasTime ? TEXT_FIELD_TIME_HELPER_TEXT : ''
    }. ${TEXT_FIELD_NUMBERS_HELPER_TEXT}`
  }

  const hasValue = Boolean(value)

  // Sets valid date on Datepicker input
  const handleChange: PatternInputProps['onChange'] = (values) => {
    const datestring = values.value

    // If the date is empty, set the date to null
    if (datestring.length === 0) {
      onDateChange(null)

      return
    }

    const isValidLength = isValidDateLength(datestring, hasTime)

    // If the length of the date is not valid, do nothing
    if (!isValidLength) {
      return
    }

    const isValidDatePattern = isValidDatePatternString(datestring)

    // If the date typed is not valid, set the date to the current date so it's not saved as invalid date
    if (!isValidDatePattern) {
      onDateChange(new Date())

      return
    }

    const validDate = parseDatePatternString(datestring)

    // Set date only if valid date
    if (validDate && isValid(validDate)) {
      onDateChange(validDate)
    } else {
      // Set the date to the current date so it's not saved as invalid date
      onDateChange(new Date())
    }
  }

  return (
    <>
      <p className={srClasses['sr-only']} id={`${id}-helpertext`}>
        {getHelperText(hasTime)}
      </p>
      <PatternInput
        {...rest}
        aria-describedby={`${id}-helpertext`}
        containerProps={{
          className: classNames(
            'Concorde-DatePicker--TextField',
            classes.container
          )
        }}
        defaultValue={defaultValue as PatternInputProps['value']}
        endAdornment={
          <IconButton
            aria-label={OPEN_DATEPICKER}
            hoverColor="var(--concorde-primary-color)"
            id={id && `${id}--open-button`}
            name="calendar_month"
            onClick={toggleCalendar}
          />
        }
        format={mask}
        id={id && `${id}--text-field`}
        inputMode="numeric"
        isDisabled={isDisabled}
        label={label}
        onChange={handleChange}
        patternChar="9"
        placeholder={!hasValue ? mask.replace(/\d/g, '_') : undefined}
        readOnly={readOnly}
        ref={ref}
        value={value as PatternInputProps['value']}
      />
    </>
  )
})

DatePickerTextField.displayName = 'DatePickerTextField'
