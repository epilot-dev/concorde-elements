import classNames from 'classnames'
import { isValid } from 'date-fns'
import { forwardRef, useEffect, useState } from 'react'

import type { PatternInputProps } from '../../'
import { PatternInput, IconButton } from '../../'
import srClasses from '../../../accessibility.module.scss'
import {
  formatDateToDigits,
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
    isRequired,
    helperText: helperTextProp,
    isError,
    ...rest
  } = props

  const {
    TEXT_FIELD_DATE_HELPER_TEXT,
    TEXT_FIELD_TIME_HELPER_TEXT,
    TEXT_FIELD_NUMBERS_HELPER_TEXT,
    OPEN_DATEPICKER
  } = useDatepickerTranslations()

  // Sync the accessible input with the non-accessible input
  const [rawDigits, setRawDigits] = useState<string>(
    value ? formatDateToDigits(value as string) : ''
  )

  const mask = generateDateMask(locale, hasTime)

  function getHelperText(hasTime?: boolean) {
    return `${helperTextProp ? `${helperTextProp}. ` : ''}${TEXT_FIELD_DATE_HELPER_TEXT} ${
      hasTime ? TEXT_FIELD_TIME_HELPER_TEXT : ''
    }. ${TEXT_FIELD_NUMBERS_HELPER_TEXT}`
  }

  const hasValue = Boolean(value)

  // Sets valid date on Datepicker input
  const handleChange: PatternInputProps['onChange'] = (values, source) => {
    if (source.source === 'prop') {
      return
    }
    setRawDigits(values.value)
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
      setRawDigits(formatDateToDigits(value as string))

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

  // Set the raw digits when the value changes
  useEffect(() => {
    setRawDigits(value ? formatDateToDigits(value as string) : '')
  }, [value])

  const helperText = getHelperText(hasTime)

  return (
    <>
      <p className={srClasses['sr-only']} id={`${id}-helpertext`}>
        {helperText}
      </p>
      {/* Accessible input */}
      <PatternInput
        aria-describedby={`${id}-helpertext`}
        aria-label={rest['aria-label']}
        containerProps={{
          className: classes['container-accessible']
        }}
        defaultValue={defaultValue as PatternInputProps['value']}
        format={mask}
        id={id && `${id}--text-field-accessible`}
        inputMode="numeric"
        isDisabled={isDisabled}
        isError={isError}
        label={label}
        mask=""
        onChange={handleChange}
        patternChar="9"
        placeholder={helperText}
        readOnly={readOnly}
        required={isRequired}
        value={rawDigits}
      />
      {/* Non-accessible input */}
      <PatternInput
        {...rest}
        aria-describedby={`${id}-helpertext`}
        aria-hidden={true}
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
        helperText={helperTextProp}
        id={id && `${id}--text-field`}
        inputMode="numeric"
        isDisabled={isDisabled}
        isError={isError}
        isRequired={isRequired}
        label={label}
        onChange={handleChange}
        onKeyDown={(event) => {
          // Do nothing on Enter
          if (event.key === 'Enter') {
            event.preventDefault()
            event.stopPropagation()

            return
          }
        }}
        patternChar="9"
        placeholder={!hasValue ? mask.replace(/\d/g, '_') : undefined}
        readOnly={readOnly}
        ref={ref}
        tabIndex={-1}
        value={rawDigits as PatternInputProps['value']}
      />
    </>
  )
})

DatePickerTextField.displayName = 'DatePickerTextField'
