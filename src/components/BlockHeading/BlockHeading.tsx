import classNames from 'classnames'
import type { PropsWithChildren } from 'react'

import { Typography } from '..'

import classes from './BlockHeading.module.scss'

type BlockHeadingProps = {
  title?: string
  subtitle?: string
  isGroup?: boolean
}

export function BlockHeading({
  title,
  subtitle,
  isGroup,
  children
}: PropsWithChildren<BlockHeadingProps>) {
  return (
    <>
      <div
        className={classNames(
          'Concorde-BlockHeading',
          classes.contentContainer
        )}
      >
        {title && (
          <Typography
            as={isGroup ? 'h3' : 'h4'}
            className={classNames(
              'Concorde-BlockHeading__Title',
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
