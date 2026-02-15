import classNames from 'classnames'

import { Icon } from '../Icon'

import classes from './ExpandIcon.module.scss'
import type { ExpandIconProps } from './types'

export const ExpandIcon = ({
  className,
  isExpanded,
  ...rest
}: ExpandIconProps) => {
  return (
    <Icon
      className={classNames(
        'Concorde-ExpandIcon',
        classes.root,
        isExpanded && classes.expanded,
        className
      )}
      name="expand_more"
      {...rest}
    />
  )
}
