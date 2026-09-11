import type { CSSProperties, InputHTMLAttributes, ReactNode } from 'react'

export type SliderProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'value' | 'defaultValue' | 'min' | 'max' | 'step' | 'onChange'
> & {
  /**
   * The current value. Values outside `min`/`max` are shown clamped.
   */
  value: number

  /**
   * The lowest selectable value.
   *
   * Defaults to `0`.
   */
  min?: number

  /**
   * The greatest selectable value.
   *
   * Defaults to `100`.
   */
  max?: number

  /**
   * The increment the thumb moves in.
   *
   * Defaults to `1`.
   */
  step?: number

  /**
   * Called with the new value while the thumb moves.
   */
  onChange?: (value: number) => void

  /**
   * Called with the final value once a drag or keyboard interaction ends.
   */
  onValueCommitted?: (value: number) => void

  /**
   * Formats a value for assistive technology and the scale labels.
   *
   * Defaults to the plain number.
   */
  formatValue?: (value: number) => string

  /**
   * Shows the formatted `min` and `max` under the rail ends.
   */
  showScale?: boolean

  /**
   * Turns on the disabled state of the slider.
   */
  isDisabled?: boolean

  /**
   * Turns on the error state of the slider.
   */
  isError?: boolean

  /**
   * Renders the slider read-only: focusable, but its value cannot change.
   */
  readOnly?: boolean

  /**
   * The class name of the root element.
   */
  className?: string

  /**
   * Content rendered under the rail, e.g. a custom scale.
   */
  children?: ReactNode
}

export interface SliderCSSProperties extends CSSProperties {
  '--concorde-slider-rail-color'?: string
  '--concorde-slider-track-color'?: string
  '--concorde-slider-thumb-color'?: string
  '--concorde-slider-rail-height'?: string
  '--concorde-slider-thumb-size'?: string
}
