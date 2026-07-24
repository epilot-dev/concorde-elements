import type { ComponentProps, CSSProperties, ReactNode } from 'react'

import type { IconName } from '../Icon'

export type ChipProps = ComponentProps<'div'> & {
  /**
   * class attached to the component
   */
  className?: string

  /**
   * Icon displayed on the left side of the chip.
   */
  leftIcon?: IconName | ReactNode

  /**
   * background color of the card.
   */
  backgroundColor?: string

  /**
   * hover background color of the card
   */
  hoverBgColor?: string

  onDelete?: () => void
  deleteAriaLabel?: string
}

export interface ChipCSSProperties extends CSSProperties {
  '--concorde-chip-background-color'?: string
  '--concorde-chip-hover-background-color'?: string
}
