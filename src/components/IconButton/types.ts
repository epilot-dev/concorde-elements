import type { ReactNode } from 'react'

import type { ButtonProps } from '../Button'
import type { IconProps } from '../Icon'

export type IconButtonProps = Omit<IconProps, 'onClick'> &
  Omit<ButtonProps, 'leftIcon' | 'rightIcon' | 'label' | 'variant'> & {
    /**
     * The accessible name of the icon button
     */
    'aria-label': string

    /**
     * Overrides the label of the button
     */
    label?: ReactNode
  }
