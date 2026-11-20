import { forwardRef, useRef } from 'react'
import {
  NumberFormatBase,
  numericFormatter,
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

/** The react-number-format settings of `NumberInput` and `useNumberInputText`. */
const getNumericFormatSettings = (
  locale?: string,
  isFormattingEnabled?: boolean
) => {
  const { decimalSeparator, groupSeparator } = getLocaleNumberFormat(locale)

  return {
    allowLeadingZeros: true,
    allowNegative: true,
    decimalSeparator,
    thousandSeparator: isFormattingEnabled ? groupSeparator : undefined
  }
}

type NumberInputTextProps = Pick<
  NumberInputProps,
  | 'value'
  | 'locale'
  | 'isFormattingEnabled'
  | 'decimalScale'
  | 'fixedDecimalScale'
>

/** The text `NumberInput` shows for these props, for a read-only value drawn without it. */
export const useNumberInputText = ({
  locale,
  isFormattingEnabled,
  ...props
}: NumberInputTextProps): string => {
  const settings = {
    ...getNumericFormatSettings(locale, isFormattingEnabled),
    ...props
  }
  // Rounds the value as `NumberInput` does; react-number-format exports no function for it
  const text = String(useNumericFormat(settings).value ?? '')

  // `NumberFormatBase` formats that text once more before it shows it
  return numericFormatter(
    removeNumericFormat(text, fullValueChange(text), settings),
    settings
  )
}

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
    const settings = getNumericFormatSettings(locale, isFormattingEnabled)
    const { decimalSeparator } = settings
    const lastValueRef = useRef(String(props.value ?? props.defaultValue ?? ''))

    const numericFormatProps: NumericFormatProps<InputProps> = {
      ...settings,
      customInput: Input,
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
