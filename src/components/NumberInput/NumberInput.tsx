import { forwardRef, useRef } from 'react'
import {
  NumberFormatBase,
  removeNumericFormat,
  useNumericFormat
} from 'react-number-format'
import type { ChangeMeta, NumericFormatProps } from 'react-number-format'

import type { InputProps } from '..'
import { Input } from '..'

import type { NumberInputProps } from './types'
import {
  getLocaleNumberFormat,
  isWithinMaxDigits,
  normalizeDecimalSeparator
} from './utils'

const fullValueChange = (value: string): ChangeMeta => ({
  from: { start: 0, end: 0 },
  to: { start: 0, end: value.length },
  lastValue: ''
})

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (props, ref) => {
    const {
      onChange,
      locale,
      isFormattingEnabled,
      maxDigits,
      isAllowed,
      ...rest
    } = props
    const { decimalSeparator, groupSeparator } = getLocaleNumberFormat(locale)
    const lastValueRef = useRef(String(props.value ?? props.defaultValue ?? ''))

    const numericFormatProps: NumericFormatProps<InputProps> = {
      allowLeadingZeros: true,
      allowNegative: true,
      customInput: Input,
      decimalSeparator,
      getInputRef: ref,
      // Typing and pasting both go through `isAllowed`; a rejected change
      // leaves the input as it was.
      isAllowed: (values) =>
        isWithinMaxDigits(values.value, lastValueRef.current, maxDigits) &&
        (isAllowed?.(values) ?? true),
      onValueChange: (values, source) => {
        lastValueRef.current = values.value

        if (source.source === 'prop') {
          return
        }
        onChange(values.value, source.source)
      },
      thousandSeparator: isFormattingEnabled ? groupSeparator : undefined,
      ...rest
    }

    return (
      <NumberFormatBase
        {...useNumericFormat(numericFormatProps)}
        removeFormatting={(value, changeMeta) => {
          const normalized = changeMeta
            ? normalizeDecimalSeparator(value, decimalSeparator, changeMeta)
            : value

          return removeNumericFormat(
            normalized,
            changeMeta ?? fullValueChange(value),
            numericFormatProps
          )
        }}
      />
    )
  }
)

NumberInput.displayName = 'NumberInput'
