import type { SwitchProps as SwitchBaseProps } from '@radix-ui/react-switch'
import type { CSSProperties } from 'react'

export type SwitchProps = Omit<SwitchBaseProps, 'onChange' | 'disabled'> & {
  /**
   * The label of the switch.
   */
  label?: string | JSX.Element

  /**
   * The position of the label.
   */
  labelPlacement?: 'end' | 'start'

  /**
   * The onChange event handler for the switch.
   */
  onChange?: SwitchBaseProps['onCheckedChange']

  /**
   * Turns on the disabled state of the switch.
   */
  isDisabled?: SwitchBaseProps['disabled']

  /**
   * Turns on the required state of the switch.
   */
  isRequired?: SwitchBaseProps['required']

  /**
   * Turns on the error state of the switch.
   */
  isError?: boolean

  /**
   * The helper text of the switch.
   */
  helperText?: string

  /**
   * The class name of the label.
   */
  labelClassName?: string
}

export interface SwitchCSSProperties extends CSSProperties {
  '--concorde-switch-unchecked-color'?: string
  '--concorde-switch-unchecked-background-color'?: string
  '--concorde-switch-border-radius'?: string
}
