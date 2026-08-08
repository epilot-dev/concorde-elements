import type { CheckboxProps as CheckboxBaseProps } from '@radix-ui/react-checkbox'
import type { CSSProperties, InputHTMLAttributes, ReactNode } from 'react'

type NativeInput = InputHTMLAttributes<HTMLInputElement>

export type CheckboxProps = Omit<NativeInput, 'onChange' | 'size'> &
  Omit<CheckboxBaseProps, 'onCheckedChange' | 'onChange'> & {
    /**
     * Sets the label of the input element.
     */
    label?: string | ReactNode

    /**
     * Sets the checked state of the checkbox input field.
     */
    checked?: boolean

    /**
     * Sets the default checked state of the checkbox input field.
     */
    defaultChecked?: boolean

    /**
     * Sets the size of the checkbox icons.
     *
     * Defaults to `24px`
     */
    size?: string

    /**
     * Sets the name of the checkbox input field.
     */
    name?: string

    /**
     * Sets the id of the checkbox input field.
     */
    id?: string

    /**
     * Sets the class of the checkbox input field.
     */
    className?: string

    /**
     * Turns on the disabled state of the checkbox input field.
     */
    isDisabled?: boolean

    /**
     * Turns on the error state of the checkbox input field.
     */
    isError?: boolean

    /**
     * Turns on the required state of the checkbox input field.
     */
    isRequired?: boolean

    /**
     * Sets the onChange handler of the checkbox input field.
     */
    onChange?: (checked: boolean) => void

    /**
     * The position of the label.
     *
     * Defaults to `end`
     */
    labelPlacement?: 'end' | 'start'

    /**
     * Sets the color of the checkbox input label.
     */
    color?: string

    /**
     * Sets the error state color of the checkbox input field.
     */
    errorColor?: string

    /**
     * Sets the unchecked state color of the checkbox input field.
     */
    uncheckedColor?: string

    /**
     * Sets the class of the checkbox input field.
     */
    labelClassName?: string
  }

export interface CheckboxCSSProperties extends CSSProperties {
  '--concorde-checkbox-label-color'?: string
  '--concorde-checkbox-error-color'?: string
  '--concorde-checkbox-unchecked-color'?: string
}
