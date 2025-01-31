import type {
  PropsWithChildren,
  ReactNode,
  CSSProperties,
  HTMLAttributes
} from 'react'

import type { IconButtonProps } from '../'
import type { TextFieldProps } from '../TextField/types'

export type StepperInputProps = TextFieldProps & {
  /**
   * Sets the value of the input element.
   */
  value?: number

  /**
   * Sets the content at the left of the input element.
   *
   * Defaults to Add icon from Material Symbols
   */
  startAdornment?: ReactNode

  /**
   * Sets the content at the right of the input element.
   *
   * Defaults to Remove icon from Material Symbols
   */
  endAdornment?: ReactNode

  /**
   * Sets the onclick handler for the `startAdornment`.
   */
  onStartIconClick?: () => void

  /**
   * Sets the onclick handler for the `endAdornment`.
   */
  onEndIconClick?: () => void

  /**
   * Sets the props of the stepper input's container element.
   */
  containerProps?: HTMLAttributes<HTMLDivElement>

  /**
   * Sets the props of the actual input's container element.
   */
  inputContainerProps?: HTMLAttributes<HTMLDivElement>

  /**
   * Sets the props of the stepper input's adornment element.
   */
  adornmentProps?: Partial<IconButtonProps>

  /**
   * Sets whether the input is full width or not
   */
  isFullWidth?: boolean
}

export type StepperInputAdornmentProps = PropsWithChildren<IconButtonProps>

export interface StepperInputCSSProperties extends CSSProperties {
  '--stepper-field-error-color'?: string
  '--stepper-field-border-color'?: string
}
