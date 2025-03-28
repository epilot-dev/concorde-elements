import classNames from 'classnames'

import { Icon } from '../'

import classes from './TabButton.module.scss'
import type { TabButtonProps } from './types'

export const TabButton = ({
  label,
  icon,
  active,
  className,
  ...props
}: TabButtonProps) => (
  <button
    className={classNames(
      classes.tabButton,
      active && classes.tabButtonSelected,
      className
    )}
    {...props}
  >
    {icon && <Icon className={classes.tabButtonIcon} name={icon} />}
    <span className={classes.tabLabel}>{label}</span>
  </button>
)
