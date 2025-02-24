import type {
  ToggleGroupItemProps as ToggleGroupItemBaseProps,
  ToggleGroupMultipleProps,
  ToggleGroupSingleProps
} from '@radix-ui/react-toggle-group'
import type { ReactNode } from 'react'

import type { ToggleButtonProps } from '../ToggleButton'

export type ToggleGroupProps = (
  | ToggleGroupSingleProps
  | ToggleGroupMultipleProps
) & {
  error?: string
  isRequired?: boolean
  'aria-label': string
  children: ReactNode
}
export type ToggleGroupItemProps = ToggleButtonProps & ToggleGroupItemBaseProps
