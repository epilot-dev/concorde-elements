import classNames from 'classnames'
import React, { useState, useRef, forwardRef, useEffect } from 'react'

import { Button } from '../Button'

import classes from './SwipeableDrawer.module.scss'
import type { SwipeableDrawerProps } from './types'

export const SwipeableDrawer = forwardRef<HTMLDivElement, SwipeableDrawerProps>(
  (
    {
      children,
      className,
      wrapChildrenWithDrawer,
      collapsedString,
      containerProps
    },
    ref
  ) => {
    const [open, setOpen] = useState(false)
    const startY = useRef(0)
    const currentY = useRef(0)
    const isHandle = useRef(false)
    const drawerRef = useRef<HTMLDivElement>(null)

    const handleTouchStart = (e: React.TouchEvent) => {
      startY.current = e.touches[0].clientY
      isHandle.current =
        (e.target as HTMLElement).classList.contains(classes.handle) ||
        (e.target as HTMLElement).classList.contains(classes.handleWrapper)
    }

    const handleTouchMove = (e: React.TouchEvent) => {
      if (!isHandle.current) return

      currentY.current = e.touches[0].clientY
      const diff = currentY.current - startY.current

      if (diff > 50) {
        setOpen(false)
      } else if (diff < -50) {
        setOpen(true)
      }
    }

    useEffect(() => {
      if (open && drawerRef.current) {
        drawerRef.current.focus()
      }
    }, [open])

    if (!wrapChildrenWithDrawer) {
      return (
        <div
          {...containerProps}
          className={classNames(
            'Concorde-SwipeableDrawer',
            containerProps?.className
          )}
        >
          {children}
        </div>
      )
    }

    return (
      <div
        {...containerProps}
        className={classNames(
          'Concorde-SwipeableDrawer',
          containerProps?.className
        )}
      >
        <div
          aria-hidden={!open}
          aria-modal="true"
          className={classNames(
            'Concorde-SwipeableDrawer__Dialog',
            classes.drawer,
            { [classes.open]: open },
            className
          )}
          onTouchMove={handleTouchMove}
          onTouchStart={handleTouchStart}
          ref={ref}
          role="dialog"
          tabIndex={-1}
        >
          <div
            aria-label="Close drawer"
            className={classNames(
              'Concorde-SwipeableDrawer__Close-Handle',
              classes.handleWrapper
            )}
            onClick={() => setOpen(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setOpen(false)
              }
            }}
            role="button"
            tabIndex={0}
          >
            <div className={classes.handle} />
          </div>

          {open && (
            <div
              className={classNames(
                'Concorde-SwipeableDrawer__Content',
                classes.content
              )}
              ref={drawerRef}
              tabIndex={-1}
            >
              {children}
            </div>
          )}
          {!open && collapsedString && (
            <Button aria-label="Open drawer" onClick={() => setOpen(true)}>
              {collapsedString}
            </Button>
          )}
        </div>
        <div
          className={classNames(classes.backdrop, { [classes.open]: open })}
          onClick={() => setOpen(false)}
          role="presentation"
        />
      </div>
    )
  }
)

SwipeableDrawer.displayName = 'SwipeableDrawer'
