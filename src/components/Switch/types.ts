import type { SwitchProps as SwitchBaseProps } from '@radix-ui/react-switch'

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
}
