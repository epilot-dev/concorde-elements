import classNames from 'classnames'
import { forwardRef } from 'react'

import classes from './Icon.module.scss'
import type { IconCSSProperties, IconProps } from './types'
import { getColor } from './utils'

export const Icon = forwardRef<HTMLSpanElement, IconProps>((props, ref) => {
  const {
    name,
    className,
    variant = 'rounded',
    color,
    hoverColor,
    size,
    style,
    isFilled,
    ...rest
  } = props

  const customProperties: IconCSSProperties = {
    '--concorde-icon-color': getColor(color),
    '--concorde-icon-hover-color': hoverColor,
    '--concorde-icon-size': size,
    '--concorde-icon-is-filled': isFilled ? `"FILL" 1` : `"FILL" 0`
  }

  const customStyles = {
    ...style,
    ...customProperties
  }

  return (
    <span
      aria-hidden
      className={classNames(
        'Concorde-Icon',
        `material-symbols-${variant}`,
        classes.root,
        className
      )}
      ref={ref}
      style={customStyles}
      {...rest}
    >
      {name}
    </span>
  )
})

Icon.displayName = 'Icon'
