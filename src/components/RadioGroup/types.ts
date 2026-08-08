import type { RadioGroupProps as RadioGroupBaseProps } from '@radix-ui/react-radio-group'
import type { CSSProperties } from 'react'

import type { IconProps, RadioProps } from '..'

export type RadioGroupProps = Omit<RadioGroupBaseProps, 'onValueChange'> & {
  /**
   * Sets the size of the radio icons.
   *
   * Defaults to radio size
   */
  size?: IconProps['size']

  /**
   * Sets the color of the radio labels.
   */
  color?: RadioProps['color']

  /**
   * Sets the error state color of the radio input fields.
   */
  errorColor?: RadioProps['errorColor']

  /**
   * Sets the unchecked state color of the radio input fields.
   */
  uncheckedColor?: RadioProps['uncheckedColor']

  /**
   * The position of the labels.
   *
   * Defaults to `end`
   */
  labelPlacement?: RadioProps['labelPlacement']

  /**
   * Turns on the error state of the radio input fields.
   */
  isError?: RadioProps['isError']

  /**
   * Turns on the required state of the radio input fields.
   */
  isRequired?: RadioProps['isRequired']

  /**
   * Turns on the required state of the radio input fields.
   */
  isDisabled?: RadioProps['isDisabled']

  /**
   * Event handler called when the value changes.
   * */
  onChange?: RadioGroupBaseProps['onValueChange']

  /**
   * The error text
   */
  error?: string

  /**
   * The multiplier for the spacing between the radios.
   */
  scale?: number
}

export interface RadioGroupCSSProperties extends CSSProperties {
  '--concorde-radio-group-scale': number
}
