import type {
  NumericFormatProps,
  PatternFormatProps,
  SourceInfo
} from 'react-number-format'

import type { InputProps } from '..'

export type NumberInputProps = Omit<InputProps, 'onChange' | 'value' | 'type'> &
  Omit<
    NumericFormatProps,
    'customInput' | 'onValueChange' | 'value' | 'onChange' | 'type'
  > & {
    /**
     * Callback that receives the numeric value (US number format) when the input changes.
     */
    onChange: (value: string, source?: SourceInfo['source']) => void

    /**
     * The locale of the number input.
     */
    locale?: string

    /**
     * Turns on the thousand formatting of the number input.
     *
     * Defaults to false
     */
    isFormattingEnabled?: boolean

    /**
     * The value of the number input
     */
    value?: string | number | null | undefined
  }

export type PatternInputProps = Omit<
  InputProps,
  'onChange' | 'value' | 'type' | 'defaultValue'
> &
  Omit<
    PatternFormatProps,
    'customInput' | 'onValueChange' | 'value' | 'onChange' | 'type'
  > & {
    /**
     * Callback that receives the numeric value (US number format) when the input changes.
     */
    onChange: PatternFormatProps['onValueChange']

    /**
     * The locale of the number input.
     */
    locale?: string

    /**
     * The value of the number input
     */
    value?: string | number | null | undefined
  }
