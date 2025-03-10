import classNames from 'classnames'
import type { PropsWithoutRef } from 'react'
import { forwardRef } from 'react'

import classes from './Link.module.scss'
import type { LinkCSSProperties, LinkProps } from './types'

export const Link = forwardRef<HTMLAnchorElement, PropsWithoutRef<LinkProps>>(
  (props, ref) => {
    const {
      className,
      isDisabled = false,
      color,
      hoverColor,
      style,
      children,
      ...rest
    } = props

    const customColors: LinkCSSProperties = {
      '--concorde-link-color': color,
      '--concorde-link-hover-color': hoverColor
    }

    const customStyles = {
      ...style,
      ...customColors
    }

    return (
      <a
        aria-disabled={isDisabled}
        className={classNames(
          'Concorde-Link',
          classes.root,
          isDisabled && classes.disabled,
          className
        )}
        ref={ref}
        style={customStyles}
        {...rest}
      >
        {children}
      </a>
    )
  }
)

Link.displayName = 'Link'
