import type {
  CSSProperties,
  DetailedHTMLProps,
  HTMLAttributes,
  ReactNode
} from 'react'

type NativeButton = DetailedHTMLProps<
  HTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

export type ButtonProps = Omit<NativeButton, 'ref' | 'disabled'> & {
  /**
   * Sets the content of the button
   */
  label?: ReactNode

  /**
   * Sets the left-positioned icon
   */
  leftIcon?: ReactNode

  /**
   * Sets the right-positioned icon
   */
  rightIcon?: ReactNode

  /**
   * Sets the color variants of the button.
   */
  variant?:
    | 'primary'
    | 'primary-danger'
    | 'ghost'
    | 'ghost-danger'
    | 'disabled'
    | 'outlined'
    | 'bare'

  /**
   * Disables the button variants (alternatively use the `disabled` variant).
   *
   * Note: This nullifies all click events
   */
  isDisabled?: boolean

  /**
   * Overrides the font color and icon color of the button
   */
  color?: string

  /**
   * Overrides the background color of the button.
   */
  backgroundColor?: string

  /**
   * Overrides the hover background color of the button.
   */
  hoverBgColor?: string

  /**
   * Overrides the active background color of the button.
   */
  activeBgColor?: string

  /**
   * Sets the button as a toggle button
   */
  isToggle?: boolean

  /**
   * Sets the button as a link button
   */
  isLink?: boolean

  href?: string
  rel?: string
  target?: string

  /**
   * Sets the gap between the icon and the label
   */
  gap?: number
}

export interface ButtonCSSProperties extends CSSProperties {
  '--concorde-button-label-color'?: string
  '--concorde-button-background-color'?: string
  '--concorde-button-hover-bg-color'?: string
  '--concorde-button-active-bg-color'?: string
  '--concorde-button-gap'?: string
  '--concorde-primary-button-background-color'?: string
  '--concorde-primary-button-hover-bg-color'?: string
  '--concorde-outlined-button-border-color'?: string
}
