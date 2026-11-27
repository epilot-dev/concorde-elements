import classNames from 'classnames'
import type { PropsWithoutRef, Ref } from 'react'
import { forwardRef } from 'react'

import classes from './Link.module.scss'
import type { LinkAsButtonProps, LinkCSSProperties, LinkProps } from './types'

export const Link = forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  PropsWithoutRef<LinkProps | LinkAsButtonProps>
>((props, ref) => {
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

  const linkClassName = classNames(
    'Concorde-Link',
    classes.root,
    rest.as === 'button' && classes.button,
    isDisabled && classes.disabled,
    className
  )

  if (rest.as === 'button') {
    const { as: _as, onClick, ...buttonProps } = rest

    return (
      <button
        aria-disabled={isDisabled}
        className={linkClassName}
        ref={ref as Ref<HTMLButtonElement>}
        style={customStyles}
        type="button"
        {...buttonProps}
        // Disabled styling alone would still let the keyboard activate it
        onClick={isDisabled ? undefined : onClick}
      >
        {children}
      </button>
    )
  }

  const { as: _as, ...anchorProps } = rest

  return (
    <a
      aria-disabled={isDisabled}
      className={linkClassName}
      ref={ref as Ref<HTMLAnchorElement>}
      style={customStyles}
      {...anchorProps}
    >
      {children}
    </a>
  )
})

Link.displayName = 'Link'
