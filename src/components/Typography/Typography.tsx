import classNames from 'classnames'
import type { ForwardedRef } from 'react'
import { forwardRef } from 'react'

import type { TypographyProps, TypographyRef, TypographyTags } from './types'
import classes from './Typography.module.scss'

const styles: { [key in TypographyTags]: string } = {
  h1: classes.h1,
  h2: classes.h2,
  h3: classes.h3,
  h4: classes.h4,
  h5: classes.h5,
  h6: classes.h6,
  p: classes.p,
  span: classes.span,
  div: classes.div,
  legend: classes.legend,
  dt: classes.dt,
  dd: classes.dd
}

const HEADING_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'legend']

export const Typography = forwardRef(
  <T extends TypographyTags>(
    props: TypographyProps<T>,
    ref: ForwardedRef<TypographyRef<T>>
  ) => {
    const { as = 'p', style, className, variant = 'primary', ...rest } = props

    const Component = as

    return (
      <Component
        className={classNames(
          'Concorde-Typography',
          HEADING_TAGS.includes(Component) && 'Concorde-Typography__Heading',
          classes.root,
          styles[Component],
          classes[variant],
          className
        )}
        // @ts-expect-error until types are fixed
        ref={ref}
        style={style}
        {...rest}
      />
    )
  }
)

Typography.displayName = 'Typography'
