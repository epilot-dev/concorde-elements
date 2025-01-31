import type {
  ToggleGroupItemProps as ToggleGroupItemBaseProps,
  ToggleGroupMultipleProps,
  ToggleGroupSingleProps
} from '@radix-ui/react-toggle-group'

import type { ToggleButtonProps } from '../ToggleButton'

export type ToggleGroupProps = (
  | ToggleGroupSingleProps
  | ToggleGroupMultipleProps
) & {
  error?: string
  isRequired?: boolean
}
export type ToggleGroupItemProps = ToggleButtonProps & ToggleGroupItemBaseProps
