import classNames from 'classnames'
import type { PropsWithoutRef } from 'react'
import { forwardRef } from 'react'

import { useTheme } from '../ThemeProvider'

import classes from './Card.module.scss'
import type { CardProps, CardCSSProperties } from './types'

export const Card = forwardRef<HTMLDivElement, PropsWithoutRef<CardProps>>(
  (props, ref) => {
    const { variants } = useTheme()
    const {
      backgroundColor,
      className,
      hoverBgColor,
      style,
      shadow,
      variant = variants?.card ?? 'shadow',
      ...rest
    } = props

    const customColors: CardCSSProperties = {
      '--concorde-card-background-color': backgroundColor,
      '--concorde-card-hover-background-color': hoverBgColor,
      '--concorde-card-custom-shadow': shadow
    }

    const customStyles = {
      ...style,
      ...customColors
    }

    return (
      <div
        className={classNames(
          'Concorde-Card',
          classes.root,
          classes[`variant-${variant}`],
          className
        )}
        ref={ref}
        style={customStyles}
        {...rest}
      />
    )
  }
)

Card.displayName = 'Card'
