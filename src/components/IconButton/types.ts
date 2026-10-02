import type { ReactNode } from 'react'

import type { ButtonProps } from '../Button'
import type { IconProps } from '../Icon'

export type IconButtonProps = Omit<IconProps, 'onClick'> &
  Omit<ButtonProps, 'leftIcon' | 'rightIcon' | 'label' | 'variant'> & {
    /**
     * The accessible name of the icon button
     * Required unless `aria-hidden` is `true`
     */
    'aria-label'?: string

    /**
     * Overrides the label of the button
     */
    label?: ReactNode

    /**
     * The class name of the icon
     */
    iconClassName?: string

    /**
     * Hides the button from assistive technologies
     */
    'aria-hidden'?: 'true' | 'false' | boolean

    /**
     * The variant of the button wrapper
     */
    buttonVariant?: ButtonProps['variant']
  }
