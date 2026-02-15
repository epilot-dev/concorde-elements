import type { ChangeEvent, FocusEvent } from 'react'
import { useState, forwardRef } from 'react'
import { useDebouncedCallback } from 'use-debounce'

import type { NumberInputProps } from '..'
import { Input, NumberInput } from '..'

import type { DebouncedInputProps } from './types'

const DEFAULT_DEBOUNCE_TIME_MS = 300

export const DebouncedInput = forwardRef<HTMLInputElement, DebouncedInputProps>(
  (props, ref) => {
    const {
      debounceTime = DEFAULT_DEBOUNCE_TIME_MS,
      value: defaultValue,
      onChange,
      onBlur,
      isNumberInput,
      defaultValue: actualDefaultValue,
      isFormattingEnabled,
      ...rest
    } = props
    const [value, setValue] = useState(defaultValue)

    const onChangeDebounced = useDebouncedCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        onChange?.(event)
      },
      debounceTime
    )

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setValue(event.target.value)
      onChangeDebounced(event)
    }

    const handleNumberInputChange = (value: string) => {
      setValue(value)
      onChangeDebounced({ target: { value } } as ChangeEvent<HTMLInputElement>)
    }

    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
      if (onBlur) {
        const value = onBlur(event)

        if (typeof value === 'string') setValue(value)
      }
    }

    if (isNumberInput) {
      return (
        <NumberInput
          {...rest}
          defaultValue={actualDefaultValue as NumberInputProps['defaultValue']}
          isFormattingEnabled={isFormattingEnabled}
          onBlur={handleBlur}
          onChange={handleNumberInputChange}
          ref={ref}
          value={value as NumberInputProps['value']}
        />
      )
    }

    return (
      <Input
        {...rest}
        defaultValue={actualDefaultValue}
        onBlur={handleBlur}
        onChange={handleChange}
        ref={ref}
        value={value}
      />
    )
  }
)

DebouncedInput.displayName = 'DebouncedInput'
