import type { CSSProperties, FocusEvent, ReactNode } from 'react'

import type { InputVariant } from '../Input/types'

/**
 * Characters accepted by the OTP input.
 */
export type OtpInputValidationType = 'numeric' | 'alphanumeric'

export type OtpInputProps = {
  /**
   * Sets the value of the code. Disallowed characters and characters beyond `length` are ignored.
   */
  value: string

  /**
   * Callback fired with the sanitized code whenever it changes.
   */
  onChange: (value: string) => void

  /**
   * Callback fired with the code once every box is filled.
   */
  onComplete?: (value: string) => void

  /**
   * Callback fired when focus moves into the group of boxes.
   */
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void

  /**
   * Callback fired when focus leaves the group of boxes.
   */
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void

  /**
   * Sets the number of boxes.
   *
   * Defaults to `6`
   */
  length?: number

  /**
   * Sets the characters accepted by the boxes.
   *
   * Defaults to `numeric`
   */
  validationType?: OtpInputValidationType

  /**
   * Sets the id of the first box. The other boxes get `${id}-box-${index}`.
   */
  id?: string

  /**
   * Sets the name of a hidden input holding the code, for native form submission.
   */
  name?: string

  /**
   * Sets the label of the input. Also used as the accessible name of the group.
   */
  label?: ReactNode

  /**
   * Sets the accessible name of the group when no visible `label` is provided.
   */
  'aria-label'?: string

  /**
   * Sets the helper text of the input. This is visible under the boxes.
   */
  helperText?: ReactNode

  /**
   * Treats the input as required.
   */
  isRequired?: boolean

  /**
   * Disables every box.
   */
  isDisabled?: boolean

  /**
   * Turns on the error state of the input.
   */
  isError?: boolean

  /**
   * Focuses the next empty box on mount.
   */
  autoFocus?: boolean

  /**
   * Returns the accessible name of a box, e.g. for translations.
   *
   * Defaults to `Digit {index + 1} of {length}` (`Character ...` for alphanumeric)
   */
  getBoxAriaLabel?: (index: number, length: number) => string

  /**
   * Sets the variant of the boxes. `filled` renders like `outlined`, as there is no floating label.
   *
   * Defaults to the theme's input variant, or `outlined`
   */
  variant?: InputVariant

  /**
   * Sets the class name of the root element.
   */
  className?: string

  /**
   * Sets the style of the root element.
   */
  style?: OtpInputCSSProperties
}

export interface OtpInputCSSProperties extends CSSProperties {
  '--concorde-input-color'?: string
  '--concorde-input-background-color'?: string
  '--concorde-input-border-color'?: string
  '--concorde-input-error-color'?: string
  '--concorde-input-label-color'?: string
  '--concorde-input-border-radius'?: string
  '--concorde-input-height'?: string
  '--concorde-otp-input-box-max-width'?: string
  '--concorde-otp-input-gap'?: string
}

export type UseOtpInputOptions = Pick<
  OtpInputProps,
  'value' | 'onChange' | 'onComplete' | 'onFocus' | 'onBlur' | 'autoFocus'
> & {
  length: number
  validationType: OtpInputValidationType
}
