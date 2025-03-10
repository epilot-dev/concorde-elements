import { Root as ToggleGroupRootBase } from '@radix-ui/react-toggle-group'
import classNames from 'classnames'
import type { PropsWithoutRef } from 'react'
import { forwardRef } from 'react'

import { Spacing, Typography } from '../../components'

import classes from './ToggleGroup.module.scss'
import type { ToggleGroupProps } from './types'

export const ToggleGroup = forwardRef<
  HTMLDivElement,
  PropsWithoutRef<ToggleGroupProps>
>(
  (
    {
      children,
      className,
      orientation = 'horizontal',
      error,
      isRequired,
      ...props
    },
    ref
  ) => {
    return (
      <Spacing scale={2} variant="stack">
        <div className={classNames(classes.container, 'Concorde-ToggleGroup')}>
          <ToggleGroupRootBase
            {...props}
            className={classNames(
              'Concorde-ToggleGroup',
              classes.root,
              className
            )}
            orientation={orientation}
            ref={ref}
          >
            {children}
          </ToggleGroupRootBase>
          {isRequired && (
            <span
              aria-hidden="true"
              className={classNames(error && classes.error, classes.asterisk)}
            >
              &thinsp;*
            </span>
          )}
        </div>
        {error && (
          <Typography as="p" className={classes.errorText} variant="error">
            {error}
          </Typography>
        )}
      </Spacing>
    )
  }
)

ToggleGroup.displayName = 'ToggleGroup'
