import classNames from 'classnames'
import type { PropsWithChildren } from 'react'

import { Typography } from '..'

import classes from './BlockHeading.module.scss'

export type BlockHeadingProps = {
  title?: string
  subtitle?: string
  isGroup?: boolean
  required?: boolean
  isNested?: boolean
}

export function BlockHeading({
  title,
  subtitle,
  isGroup,
  children,
  required,
  isNested
}: PropsWithChildren<BlockHeadingProps>) {
  if (!title && !subtitle) {
    return <>{children}</>
  }

  return (
    <>
      <div
        className={classNames(
          'Concorde-BlockHeading',
          classes.contentContainer,
          !title && !subtitle && classes.noTitleSubtitle,
          required && classes.required
        )}
      >
        {title && (
          <Typography
            as={isGroup || !isNested ? 'h3' : 'h4'}
            className={classNames(
              'Concorde-BlockHeading__Title',
              'title',
              classes.title
            )}
            variant="primary"
          >
            {title}
          </Typography>
        )}
        {subtitle && (
          <Typography
            className={classNames(
              'Concorde-BlockHeading__Subtitle',
              'subtitle',
              classes.subtitle
            )}
            variant="secondary"
          >
            {subtitle}
          </Typography>
        )}
      </div>
      {children}
    </>
  )
}
