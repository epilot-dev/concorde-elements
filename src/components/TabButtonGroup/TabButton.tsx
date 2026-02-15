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
    aria-selected={active}
    className={classNames(
      'Concorde-TabButton',
      classes.tabButton,
      active && classes.tabButtonSelected,
      className
    )}
    role="tab"
    {...props}
  >
    {icon && <Icon className={classes.tabButtonIcon} name={icon} />}
    <span className={classes.tabLabel}>{label}</span>
  </button>
)
