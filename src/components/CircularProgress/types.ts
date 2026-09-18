import type { CSSProperties } from 'react'

export type CircularProgressProps = {
  /**
   * The size of the circle
   */
  size?: number

  /**
   * The thickness of the circle
   */
  thickness?: number

  /**
   * The percentage of the circle that is filled
   */
  value?: number

  /**
   * The color of the circle
   */
  color?: string

  /**
   * The speed of the circle
   */
  speed?: CSSProperties['animationDuration']

  /**
   * Custom class of the circular progress
   */
  className?: string

  /**
   * Variant of the circular progress
   */
  variant?: 'primary' | 'secondary'
}

export interface CircularProgressCSSProperties extends CSSProperties {
  '--concorde-circular-progress-size'?: string
  '--concorde-circular-progress-speed'?: string
}
