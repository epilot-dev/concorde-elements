import type { InputProps, NumberInputProps } from '..'

export type DebouncedInputProps = InputProps & {
  /**
   * The debounce time in milliseconds
   */
  debounceTime?: number

  /**
   * Changes the input to a number input
   */
  isNumberInput?: boolean

  /**
   * Formats the number input automatically
   */
  isFormattingEnabled?: boolean

  /**
   * Maximum number of digits of the number input, see {@link NumberInputProps.maxDigits}
   */
  maxDigits?: NumberInputProps['maxDigits']
}
