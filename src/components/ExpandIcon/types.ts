import type { IconProps } from '../Icon'

export type ExpandIconProps = Omit<IconProps, 'name'> & {
  /**
   * Decides the icon rotation state.
   *
   * @default false
   */
  isExpanded: boolean
}
