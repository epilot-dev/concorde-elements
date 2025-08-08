import classNames from 'classnames'
import type { PropsWithoutRef } from 'react'
import { forwardRef } from 'react'

import { Button } from '../Button'
import { Icon } from '../Icon'

import classes from './IconButton.module.scss'
import type { IconButtonProps } from './types'

export const IconButton = forwardRef<
  HTMLButtonElement,
  PropsWithoutRef<IconButtonProps>
>((props, ref) => {
  const {
    name,
    className,
    color,
    hoverColor,
    label,
    size,
    variant,
    isFilled,
    iconClassName,
    ...rest
  } = props

  return (
    <Button
      className={classNames('Concorde-IconButton', classes.root, className)}
      color={color}
      ref={ref}
      {...rest}
      label={
        label || (
          <Icon
            className={iconClassName}
            color={color}
            hoverColor={hoverColor}
            isFilled={isFilled}
            name={name}
            size={size}
            variant={variant}
          />
        )
      }
    />
  )
})

IconButton.displayName = 'IconButton'
