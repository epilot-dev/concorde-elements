import type { ToggleProps } from '@radix-ui/react-toggle'

import type { ButtonProps } from '../Button'

export type ToggleButtonProps = ButtonProps &
  ToggleProps & {
    /**
     * The selected state of the toggle.
     */
    'data-state'?: 'on' | 'off'
  }
