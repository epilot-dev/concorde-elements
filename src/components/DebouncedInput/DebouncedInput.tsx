import type { ChangeEvent, FocusEvent } from 'react'
import { useState, forwardRef } from 'react'
import { useDebouncedCallback } from 'use-debounce'

import { Input } from '..'

import type { DebouncedInputProps } from './types'

const DEFAULT_DEBOUNCE_TIME_MS = 300

export const DebouncedInput = forwardRef<HTMLInputElement, DebouncedInputProps>(
  (props, ref) => {
    const {
      debounceTime = DEFAULT_DEBOUNCE_TIME_MS,
      value: defaultValue,
      onChange,
      onBlur,
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

    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
      if (onBlur) {
        const value = onBlur(event)

        if (typeof value === 'string') setValue(value)
      }
    }

    return (
      <Input
        {...rest}
        onBlur={handleBlur}
        onChange={handleChange}
        ref={ref}
        value={value}
      />
    )
  }
)

DebouncedInput.displayName = 'DebouncedInput'
