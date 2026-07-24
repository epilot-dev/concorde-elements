import type {
  InputHTMLAttributes,
  ReactNode,
  HTMLAttributes,
  CSSProperties
} from 'react'

type NativeInput = InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>

export type TextFieldProps = NativeInput & {
  /**
   * Sets the label of the input element.
   */
  label?: string

  /**
   * Sets the helper text of the input field. This is visible under the input element.
   */
  helperText?: ReactNode

  /**
   * Sets the props of the input's container element.
   */
  containerProps?: HTMLAttributes<HTMLDivElement>

  /**
   * Treats the input element as required.
   */
  isRequired?: boolean

  /**
   * Disables the input element.
   */
  isDisabled?: boolean

  /**
   * Sets the content at the left of the input element.
   */
  startAdornment?: ReactNode

  /**
   * Sets the content at the end of the input element.
   */
  endAdornment?: ReactNode

  /**
   * Turns on the error state of the input element.
   */
  isError?: boolean

  /**
   * Sets the color of the input element.
   */
  color?: string

  /**
   * Sets the background color of the input element.
   */
  backgroundColor?: string

  /**
   * Sets the error state color of the input element.
   */
  errorColor?: string

  /**
   * Sets the border color of the input element.
   */
  borderColor?: string

  /**
   * Turns the input into multiline textarea.
   */
  isTextarea?: boolean
}

export interface TextFieldCSSProperties extends CSSProperties {
  '--concorde-text-field-color'?: string
  '--concorde-text-field-background-color'?: string
  '--concorde-text-field-border-color'?: string
  '--concorde-text-field-error-color'?: string
}
