import type { RadioGroupItemProps as RadioGroupItemBaseProps } from '@radix-ui/react-radio-group'
import type {
  CSSProperties,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode
} from 'react'

type NativeRadioInput = InputHTMLAttributes<HTMLInputElement>

export type RadioProps = Omit<NativeRadioInput, 'onChange'> & {
  /**
   * Sets the label of the input element.
   */
  label?: string | ReactNode

  /**
   * Sets the checked state of the radio input field.
   */
  checked?: boolean

  /**
   * Sets the default checked state of the radio input field.
   */
  defaultChecked?: boolean

  /**
   * Sets the size of the radio icons.
   *
   * Defaults to `24px`
   */
  size?: string

  /**
   * Sets the name of the radio input field.
   */
  name?: string

  /**
   * Sets the id of the radio input field.
   */
  id?: string

  /**
   * Sets the class of the radio input field.
   */
  className?: string

  /**
   * Sets the props of the radio input's container element.
   */
  containerProps?: HTMLAttributes<HTMLLabelElement>

  /**
   * Sets the props of the radio input's label element.
   */
  labelProps?: HTMLAttributes<HTMLLabelElement>

  /**
   * Turns on the disabled state of the radio input field.
   */
  isDisabled?: boolean

  /**
   * Turns on the error state of the radio input field.
   */
  isError?: boolean

  /**
   * Turns on the required state of the radio input field.
   */
  isRequired?: boolean

  /**
   * Sets the onChange handler of the radio input field.
   */
  onChange?: (checked: boolean) => void

  /**
   * The position of the label.
   *
   * Defaults to `end`
   */
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom'

  /**
   * Sets the color of the radio input label.
   */
  color?: string

  /**
   * Sets the error state color of the radio input field.
   */
  errorColor?: string

  /**
   * Sets the unchecked state color of the radio input field.
   */
  uncheckedColor?: string
}

export type RadioGroupItemProps = Omit<
  RadioProps,
  'defaultChecked' | 'checked'
> &
  RadioGroupItemBaseProps & {
    /**
     * The checked state of the radio input field.
     */
    'data-state'?: 'checked' | 'unchecked'
  }

export interface RadioCSSProperties extends CSSProperties {
  '--concorde-radio-label-color'?: string
  '--concorde-radio-error-color'?: string
  '--concorde-radio-unchecked-color'?: string
}
