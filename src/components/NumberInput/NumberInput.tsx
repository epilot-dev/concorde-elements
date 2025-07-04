import { forwardRef } from 'react'
import { NumericFormat } from 'react-number-format'

import { Input } from '..'

import type { NumberInputProps } from './types'
import { getLocaleNumberFormat } from './utils'

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (props, ref) => {
    const { onChange, locale, isFormattingEnabled, ...rest } = props
    const { decimalSeparator, groupSeparator } = getLocaleNumberFormat(locale)

    return (
      <NumericFormat
        allowLeadingZeros
        customInput={Input}
        decimalSeparator={decimalSeparator}
        getInputRef={ref}
        onValueChange={(values, source) => {
          if (source.source === 'prop') {
            return
          }
          onChange(values.value, source.source)
        }}
        thousandSeparator={isFormattingEnabled ? groupSeparator : undefined}
        {...rest}
      />
    )
  }
)

NumberInput.displayName = 'NumberInput'
