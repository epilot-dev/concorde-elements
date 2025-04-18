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
>((props, ref) => {
  const {
    children,
    className,
    orientation = 'horizontal',
    error,
    isRequired,
    ...rest
  } = props

  return (
    <Spacing scale={2} variant="stack">
      <div className={classNames(classes.container, 'Concorde-ToggleGroup')}>
        <ToggleGroupRootBase
          {...rest}
          aria-required={isRequired}
          className={classNames(
            'Concorde-ToggleGroup',
            classes.root,
            className
          )}
          orientation={orientation}
          ref={ref}
          role="radiogroup"
          // Disable the Radix default keyboard navigation
          // This will allow standard tab navigation to work
          rovingFocus={false}
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
})

ToggleGroup.displayName = 'ToggleGroup'
