import type { InputProps } from '..'

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
}
