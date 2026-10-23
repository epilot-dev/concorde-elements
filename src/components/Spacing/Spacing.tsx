import classnames from 'classnames'
import type { PropsWithoutRef } from 'react'
import { forwardRef } from 'react'

import classes from './Spacing.module.scss'
import type { SpacingCSSProperties, SpacingProps } from './types'

export const Spacing = forwardRef<
  HTMLDivElement,
  PropsWithoutRef<SpacingProps>
>((props, ref) => {
  const {
    alignItems = 'flex-start',
    scale = 1,
    style,
    variant,
    className,
    justifyContent,
    ...rest
  } = props

  const customVariables: SpacingCSSProperties = {
    '--concorde-spacing-scale': scale,
    '--concorde-spacing-align-items': alignItems,
    '--concorde-spacing-justify-content': justifyContent
  }

  const customStyles = {
    ...style,
    ...customVariables
  }

  return (
    <div
      className={classnames(
        'Concorde-Spacing',
        variant === 'inline' && 'Concorde-Spacing__Inline',
        variant === 'stack' && 'Concorde-Spacing__Stack',
        variant === 'inset' && 'Concorde-Spacing__Inset',
        classes.root,
        classes[`variant-${variant}`],
        className
      )}
      ref={ref}
      style={customStyles}
      {...rest}
    />
  )
})

Spacing.displayName = 'Spacing'
