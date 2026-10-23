import type { CSSProperties } from 'react'

import type { IconProps } from '..'

export type RatingProps = {
  /**
   * The value of the rating.
   */
  value?: number

  /**
   * The maximum value of the rating.
   */
  max?: number

  /**
   * The callback function when the rating value changes.
   */
  onChange?: (value: number) => void

  /**
   * The name of the icon.
   *
   * Defaults to `star`.
   */
  iconName?: IconProps['name']

  /**
   * The class name of the rating.
   */
  className?: string

  /**
   * The labels of the rating icons.
   */
  labels?: string[]

  /**
   * The id of the rating.
   */
  id?: string

  /**
   * The accessible name of the rating group.
   */
  name?: string

  /**
   * The class name of the rating icons.
   */
  iconClassName?: string
}

export interface RatingCSSProperties extends CSSProperties {
  '--concorde-rating-unchecked-color'?: string
  '--concorde-rating-checked-color'?: string
}
