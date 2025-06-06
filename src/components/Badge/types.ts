import type {
  BadgeBadgeSlotProps,
  BadgeRootSlotProps,
  BadgeProps as BaseBadgeProps
} from '@mui/base/Badge'

export type BadgeProps = BaseBadgeProps & {
  /*
   * Props of the badge root element
   */
  containerProps?: BadgeRootSlotProps

  /*
   * Props of the badge
   */
  badgeProps?: BadgeBadgeSlotProps

  /*
   * Variant of the badge
   */
  variant?: 'primary' | 'secondary' | 'error'
}
