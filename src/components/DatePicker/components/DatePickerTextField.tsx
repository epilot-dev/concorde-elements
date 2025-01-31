import { forwardRef } from 'react'

import { IconButton } from '../../IconButton'
import { Input } from '../../Input'

import type { DatePickerTextFieldProps } from './types'

export const DatePickerTextField = forwardRef<
  HTMLInputElement,
  DatePickerTextFieldProps
>(({ toggleCalendar, inputId: id, ...props }, ref) => (
  <Input
    {...props}
    containerProps={{ className: 'Concorde-DatePicker--TextField' }}
    endAdornment={
      <IconButton
        aria-label="Open Date Picker"
        id={id && `${id}--open-button`}
        name="calendar_month"
        onClick={toggleCalendar}
      />
    }
    id={id && `${id}--text-field`}
    ref={ref}
  />
))

DatePickerTextField.displayName = 'DatePickerTextField'
