import { forwardRef } from 'react'

import { IconButton } from '../../'
import { MaskedInput } from '../../IbanInput/MaskedInput'
import { generateDateMask } from '../utils'

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
    ...rest
  } = props
  const mask = generateDateMask(locale, hasTime)

  return (
    <MaskedInput
      alwaysShowMask={!label}
      disabled={isDisabled}
      inputProps={{
        ...rest,
        isDisabled,
        label,
        containerProps: { className: 'Concorde-DatePicker--TextField' },
        endAdornment: (
          <IconButton
            aria-label="Open Date Picker"
            id={id && `${id}--open-button`}
            name="calendar_month"
            onClick={toggleCalendar}
          />
        ),
        id: id && `${id}--text-field`
      }}
      mask={mask}
      readOnly={readOnly}
      ref={ref}
    />
  )
})

DatePickerTextField.displayName = 'DatePickerTextField'
