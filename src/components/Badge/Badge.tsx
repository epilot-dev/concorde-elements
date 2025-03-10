import { Badge as BaseBadge } from '@mui/base/Badge'
import classNames from 'classnames'

import classes from './Badge.module.scss'
import type { BadgeProps } from './types'

export const Badge = (props: BadgeProps) => {
  const { containerProps, badgeProps, variant, ...rest } = props

  return (
    <BaseBadge
      {...rest}
      slotProps={{
        root: {
          ...containerProps,
          className: classNames(
            'Concorde-Badge',
            classes.root,
            containerProps?.className
          )
        },
        badge: {
          ...badgeProps,
          className: classNames(
            'Concorde-Badge__Badge',
            classes.badge,
            variant && classes[variant],
            badgeProps?.className
          )
        }
      }}
    />
  )
}
