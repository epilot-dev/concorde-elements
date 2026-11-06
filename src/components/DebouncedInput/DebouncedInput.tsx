import type { ChangeEvent, FocusEvent } from 'react'
import { useState, forwardRef } from 'react'
import { useDebouncedCallback } from 'use-debounce'

import type { NumberInputProps } from '..'
import { Input, NumberInput } from '..'

import type { DebouncedInputProps } from './types'

const DEFAULT_DEBOUNCE_TIME_MS = 300

/**
 * This component wraps {@link NumberInput} or {@link Input} components and debounce their changes,
 * which shouldn't be necessary anymore.
 *
 * @deprecated please use {@link NumberInput} or {@link Input} directly instead
 */
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
      maxDigits,
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
      // Commit a pending change first, so leaving the field never hands blur
      // handlers (or validation) a value the input no longer shows.
      onChangeDebounced.flush()

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
          maxDigits={maxDigits}
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
