import { isValid } from 'date-fns'
import { forwardRef } from 'react'

import type { PatternInputProps } from '../../'
import { PatternInput, IconButton } from '../../'
import srClasses from '../../../accessibility.module.scss'
import {
  generateDateMask,
  isValidDatePatternString,
  parseDatePatternString,
  useDatepickerTranslations
} from '../utils'

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
    const isValidDatePattern = isValidDatePatternString(datestring, hasTime)

    if (!isValidDatePattern) {
      return
    }

    const validDate = parseDatePatternString(datestring)

    // Set date only if valid date
    if (validDate && isValid(validDate)) {
      onDateChange(validDate)
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
        containerProps={{ className: 'Concorde-DatePicker--TextField' }}
        defaultValue={defaultValue as PatternInputProps['value']}
        endAdornment={
          <IconButton
            aria-label={OPEN_DATEPICKER}
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
