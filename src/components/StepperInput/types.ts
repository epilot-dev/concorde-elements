import type { PropsWithChildren, CSSProperties, HTMLAttributes } from 'react'

import type { IconButtonProps } from '../'
import type { TextFieldProps } from '../TextField/types'

export type StepperInputProps = TextFieldProps & {
  /**
   * Sets the value of the input element.
   */
  value?: number

  /**
   * Sets the onclick handler for the `startAdornment`.
   */
  onDecrementClick?: () => void

  /**
   * Sets the onclick handler for the `endAdornment`.
   */
  onIncrementClick?: () => void

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
   * Sets the props of the stepper input's decrement adornment element.
   */
  decrementAdornmentProps?: Partial<IconButtonProps>

  /**
   * Sets the props of the stepper input's increment adornment element.
   */
  incrementAdornmentProps?: Partial<IconButtonProps>

  /**
   * Sets whether the input is full width or not
   */
  isFullWidth?: boolean
}

export type StepperInputAdornmentProps = PropsWithChildren<IconButtonProps>

export interface StepperInputCSSProperties extends CSSProperties {
  '--concorde-stepper-field-error-color'?: string
  '--concorde-stepper-field-border-color'?: string
}
