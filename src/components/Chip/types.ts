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

  /**
   * Vertical density of the chip. `medium` (the default) is the large,
   * tappable chip used for choice buttons and badges. `small` is the compact
   * chip used to represent an existing selection, e.g. above a multi-select
   * combobox, where the chip must read as subordinate to the input.
   */
  size?: 'small' | 'medium'

  onDelete?: () => void
  deleteAriaLabel?: string
}

export interface ChipCSSProperties extends CSSProperties {
  '--concorde-chip-background-color'?: string
  '--concorde-chip-hover-background-color'?: string
}
