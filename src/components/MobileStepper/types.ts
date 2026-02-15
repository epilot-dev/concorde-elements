import type {
  HTMLAttributes,
  DetailedHTMLProps,
  ReactNode,
  CSSProperties
} from 'react'

type NativeDiv = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export type MobileStepperProps = Omit<NativeDiv, 'ref'> & {
  /**
   * The total number of steps.
   */
  steps: number

  /**
   * The active step (zero based index).
   * Defines which step is highlighted when the variant is `dots`.
   */
  activeStep: number

  /**
   * Set the active step (zero based index).
   */
  setActiveStep?: (step: number) => void

  /**
   * A next button element for the stepper element. For instance, it can be a `Button` or an `Icon`.
   */
  nextButton?: ReactNode

  /**
   * A back button element for the stepper element. For instance, it can be a `Button` or an `Icon`.
   */
  backButton?: ReactNode

  /**
   * Set the positioning type of the stepper element.
   *
   * Defaults to `static`
   */
  position?: 'bottom' | 'top' | 'static'

  /**
   * Sets the steps variant.
   *
   * Defaults to `dots`
   */
  variant?: 'text' | 'dots' | 'progress'

  /**
   * Sets the color of the stepper element.
   */
  color?: string

  /**
   * Sets the background color of the stepper element.
   */
  backgroundColor?: string

  /**
   * Sets the background color of steps dots or progress bar.
   */
  stepBgColor?: string

  /**
   * Sets the activebackground color of steps dots or progress bar.
   */
  activeStepBgColor?: string
}

export interface MobileStepperCSSProperties extends CSSProperties {
  '--concorde-mobile-stepper-color'?: string
  '--concorde-mobile-stepper-background-color'?: string
  '--concorde-mobile-stepper-step-background-color'?: string
  '--concorde-mobile-stepper-active-step-background-color'?: string
}
