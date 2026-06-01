import classNames from 'classnames'
import type { ReactNode } from 'react'

import type { IconName } from '../Icon'
import { Icon } from '../Icon'

import classes from './Chip.module.scss'
import type { ChipProps, ChipCSSProperties } from './types'

const isIconName = (icon: IconName | ReactNode): icon is IconName =>
  typeof icon === 'string'

export const Chip = (props: ChipProps) => {
  const {
    backgroundColor,
    className,
    hoverBgColor,
    style,
    children,
    leftIcon,
    onDelete,
    deleteAriaLabel = '',
    ...rest
  } = props

  const customColors: ChipCSSProperties = {
    '--concorde-chip-background-color': backgroundColor,
    '--concorde-chip-hover-background-color': hoverBgColor
  }

  return (
    <div
      className={classNames('Concorde-Chip', classes.root, className)}
      style={{ ...style, ...customColors }}
      {...rest}
    >
      <div className={classes.container}>
        <div className={classes.iconLabelContainer}>
          {isIconName(leftIcon) ? <Icon isFilled name={leftIcon} /> : leftIcon}
          {children}
        </div>
        {onDelete && (
          <div
            aria-label={deleteAriaLabel}
            className={classes.closeButtonContainer}
            onClick={onDelete}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onDelete()
              }
            }}
            role="button"
            tabIndex={0}
          >
            <Icon className={classes.closeIcon} name="close" />
          </div>
        )}
      </div>
    </div>
  )
}

Chip.displayName = 'Chip'
