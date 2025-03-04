import classNames from 'classnames'
import type { PropsWithoutRef } from 'react'
import { forwardRef } from 'react'

import classes from './Card.module.scss'
import type { CardProps, CardCSSProperties } from './types'

export const Card = forwardRef<HTMLDivElement, PropsWithoutRef<CardProps>>(
  (props, ref) => {
    const {
      backgroundColor,
      className,
      isFeatured,
      featuredColor,
      featuredLabelColor,
      featuredText,
      hoverBgColor,
      style,
      noHover,
      shadow,
      ...rest
    } = props

    const customColors: CardCSSProperties = {
      '--concorde-card-featured-text': featuredText ? `"${featuredText}"` : '',
      '--concorde-card-featured-color': featuredColor,
      '--concorde-card-featured-label-color': featuredLabelColor,
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
          isFeatured && classes.featured,
          className,
          noHover && classes.noHover
        )}
        ref={ref}
        style={customStyles}
        {...rest}
      />
    )
  }
)

Card.displayName = 'Card'
