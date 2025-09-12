import type {
  InputHTMLAttributes,
  ReactNode,
  HTMLAttributes,
  CSSProperties,
  DetailedHTMLProps,
  PropsWithChildren,
  PropsWithoutRef,
  TextareaHTMLAttributes
} from 'react'

type NativeInput = InputHTMLAttributes<HTMLInputElement>

type NativeTextarea = TextareaHTMLAttributes<HTMLTextAreaElement>

type NativeDiv = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

type BaseInputProps = {
  /**
   * Sets the label of the input element.
   *
   * If no label is provided, defaults to `placeholder`
   */
  label?: string

  /**
   * Sets the label id of the input element.
   */
  labelId?: string

  /**
   * Sets the helper text of the input field. This is visible under the input element.
   */
  helperText?: ReactNode

  /**
   * Sets the props of the input's container element.
   */
  containerProps?: HTMLAttributes<HTMLDivElement>

  /**
   * Sets the props of the input's adonrment element.
   */
  adornmentProps?: PropsWithoutRef<Omit<InputAdornmentProps, 'isFocused'>>

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
   * Sets the label color of the input element.
   */
  labelColor?: string

  /**
   * Sets the border radius of the input element.
   */
  borderRadius?: number

  /**
   * Sets the input as a trigger input.
   *
   * Use with `isTriggered` to control focus state of input element
   */
  isTriggerInput?: boolean

  /**
   * Sets the focus state of the input element.
   *
   * Overrides local focused state
   *
   *  Use with `isTriggerInput` to control focus state of input element
   */
  isTriggered?: boolean

  /**
   * Sets the variant of the input element.
   *
   * Defaults to `outlined`
   */
  variant?: 'outlined' | 'filled'
}

export type InputProps = NativeInput &
  BaseInputProps & {
    /**
     * Sets the floating label of the input element.
     */
    floatingLabel?: string | ReactNode
  }

export type TextareaProps = NativeTextarea & BaseInputProps

export type InputBaseProps = (InputProps | TextareaProps) & {
  /**
   * Sets the focus state of the input element.
   */
  isFocused?: boolean

  /**
   * Sets the active state of the input element.
   */
  isActiveState?: boolean

  /**
   * Treats the input as a textarea.
   */
  isTextarea?: boolean
}

export type InputAdornmentProps = PropsWithChildren<NativeDiv> & {
  /**
   * Turns on the error state of the input adornment.
   */
  isError?: boolean

  /**
   * Turns on the disabled state of the input adornment.
   */
  isDisabled?: boolean

  /**
   * Turns on the focused state of the input adornment.
   */
  isFocused?: boolean

  /**
   * Ensures that adornment triggers input on click
   */
  isTriggerInput?: boolean

  /**
   * Ensures the adornment is styled for TextArea
   */
  isTextarea?: boolean
}

type BaseUseInputOptions = {
  textarea: TextareaProps
  input: InputProps
}

export type UseInputOptions<Type extends 'input' | 'textarea'> = Omit<
  BaseUseInputOptions[Type],
  | 'label'
  | 'adornmentProps'
  | 'containerProps'
  | 'helperText'
  | 'style'
  | 'color'
  | 'backgroundColor'
  | 'borderColor'
  | 'errorColor'
  | 'borderRadius'
  | 'labelColor'
> & {
  /**
   * Treats the input as a textarea.
   */
  isTextarea?: boolean

  /**
   * Treats the input as autofilled.
   */
  isAutofilled?: boolean
}

export type UseInputBaseOptions = Pick<
  InputProps | TextareaProps,
  'label' | 'startAdornment' | 'isRequired' | 'value' | 'defaultValue'
>

export interface InputCSSProperties extends CSSProperties {
  '--concorde-input-color'?: string
  '--concorde-input-background-color'?: string
  '--concorde-input-border-color'?: string
  '--concorde-input-error-color'?: string
  '--concorde-input-label-color'?: string
  '--concorde-input-label-width'?: string
  '--concorde-input-start-adornment-width'?: string
  '--concorde-input-border-radius'?: string
}
