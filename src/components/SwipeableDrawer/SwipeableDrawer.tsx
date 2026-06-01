import classNames from 'classnames'
import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  forwardRef,
  useCallback
} from 'react'

import { Button } from '../Button'

import classes from './SwipeableDrawer.module.scss'
import type { SwipeableDrawerProps } from './types'

export const SwipeableDrawer = forwardRef<HTMLDivElement, SwipeableDrawerProps>(
  (
    { children, wrapChildrenWithDrawer, collapsedString, containerProps },
    ref
  ) => {
    const [open, setOpen] = useState(false)
    const [visiblePartHeight, setVisiblePartHeight] = useState(0)
    const [isInitialRender, setIsInitialRender] = useState(true)
    const drawerRef = useRef<HTMLDivElement>(null)
    const ctaRef = useRef<HTMLDivElement>(null)
    const handleWrapperRef = useRef<HTMLDivElement>(null)
    const startY = useRef(0)
    const currentY = useRef(0)
    const isHandle = useRef(false)

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

    const calculateVisiblePartHeight = useCallback(() => {
      if (ctaRef.current && handleWrapperRef.current) {
        const ctaHeight = ctaRef.current.offsetHeight
        const handleHeight = handleWrapperRef.current.offsetHeight
        const extraHeight = 30 // Additional space for the handle

        setVisiblePartHeight(ctaHeight + handleHeight + extraHeight)
      }
    }, [])

    // Calculate drawer position on mount and when dependencies change
    useLayoutEffect(() => {
      calculateVisiblePartHeight()

      // Defer enabling transitions until after the first paint to avoid initial slide when SwipeableDrawer is mounted
      let rafId1 = 0
      let rafId2 = 0

      rafId1 = requestAnimationFrame(() => {
        rafId2 = requestAnimationFrame(() => {
          setIsInitialRender(false)
        })
      })

      const resizeObserver = new ResizeObserver(() => {
        calculateVisiblePartHeight()
      })

      if (ctaRef.current) {
        resizeObserver.observe(ctaRef.current)
      }

      if (handleWrapperRef.current) {
        resizeObserver.observe(handleWrapperRef.current)
      }

      window.addEventListener('resize', calculateVisiblePartHeight)

      return () => {
        cancelAnimationFrame(rafId1)
        cancelAnimationFrame(rafId2)
        window.removeEventListener('resize', calculateVisiblePartHeight)
        resizeObserver.disconnect()
      }
    }, [calculateVisiblePartHeight])

    // Focus the drawer when opened
    useEffect(() => {
      if (open && drawerRef.current) {
        drawerRef.current.focus()
      }
    }, [open])

    // Get transform style based on open state and visible part height
    const getTransformStyle = useCallback(() => {
      if (open) {
        return 'translateY(0)'
      } else {
        // If visiblePartHeight is 0 (not calculated yet), use a default value
        // This prevents the drawer from being positioned outside the viewport
        const height = visiblePartHeight || 80 // Default height for handle + button

        return `translateY(calc(100% - ${height}px))`
      }
    }, [open, visiblePartHeight])

    if (!wrapChildrenWithDrawer) {
      return (
        <div
          {...containerProps}
          className={classNames(
            'Concorde-SwipeableDrawer',
            containerProps?.className
          )}
          ref={ref}
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
          classes.drawerContainer,
          {
            [classes.open]: open
          }
        )}
        ref={ref}
        style={{
          transform: getTransformStyle(),
          transition: isInitialRender ? 'none' : undefined
        }}
      >
        <div
          aria-hidden={!open}
          aria-label="Swipeable Drawer"
          aria-modal="true"
          className={classNames(
            'Concorde-SwipeableDrawer__Dialog',
            classes.drawer
          )}
          onTouchMove={handleTouchMove}
          onTouchStart={handleTouchStart}
          ref={drawerRef}
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
            ref={handleWrapperRef}
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
              tabIndex={-1}
            >
              {children}
            </div>
          )}
          {!open && collapsedString && (
            <div ref={ctaRef}>
              <Button aria-label="Open drawer" onClick={() => setOpen(true)}>
                {collapsedString}
              </Button>
            </div>
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
