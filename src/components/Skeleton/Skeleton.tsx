import { Slot } from '@radix-ui/react-slot'
import classNames from 'classnames'
import type { PropsWithoutRef } from 'react'
import { version, forwardRef, isValidElement, memo } from 'react'

import classes from './Skeleton.module.scss'
import type { SkeletonElement, SkeletonProps } from './types'

// "inert" works differently between React versions
// https://github.com/facebook/react/pull/24730
export const inert = parseFloat(version) >= 19 || ''

/**
 * Heavily inspired by Radix's Skeleton component.
 *
 * TODO: Sync from the Builder implementation for better 'span' handling.
 *
 * @see {@link https://www.radix-ui.com/themes/docs/components/skeleton}
 */
export const Skeleton = memo(
  forwardRef<SkeletonElement, PropsWithoutRef<SkeletonProps>>(
    (
      { loading = true, children, className, ...skeletonProps },
      forwardedRef
    ) => {
      if (!loading) return <>{children}</>

      const Tag = isValidElement(children) ? Slot : 'span'

      return (
        <Tag
          aria-hidden
          className={classNames('Concorde-Skeleton', classes.root, className)}
          data-inline-skeleton={isValidElement(children) ? undefined : true}
          // @ts-expect-error since inert is missign in SlotProps
          inert={inert}
          ref={forwardedRef}
          tabIndex={-1}
          {...skeletonProps}
        >
          {children}
        </Tag>
      )
    }
  )
)

Skeleton.displayName = 'Skeleton'
