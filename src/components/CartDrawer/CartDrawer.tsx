import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import { Icon } from '../Icon'
import { useStyleInjection } from '../StyleInjectionProvider/StyleInjectionProvider'

import classes from './CartDrawer.module.scss'
import type { CartDrawerProps } from './types'

export const CartDrawer = ({
  open,
  onClose,
  closeLabel = 'Close',
  children
}: CartDrawerProps) => {
  const drawerRef = useRef<HTMLDivElement>(null)
  const prevOverflowRef = useRef('')
  const [isInitialRender, setIsInitialRender] = useState(true)
  const { getPortalContainer } = useStyleInjection()
  const portalContainer = getPortalContainer()

  // Set initial render state to false after the first paint
  useEffect(() => {
    let rafId1 = 0
    let rafId2 = 0

    rafId1 = requestAnimationFrame(() => {
      rafId2 = requestAnimationFrame(() => {
        setIsInitialRender(false)
      })
    })

    return () => {
      cancelAnimationFrame(rafId1)
      cancelAnimationFrame(rafId2)
    }
  }, [])

  useEffect(() => {
    if (open && drawerRef.current) {
      drawerRef.current.focus()
    }
  }, [open])

  useEffect(() => {
    // Prevent scrolling on the body when the drawer is open
    // Only lock body scroll when not in Shadow DOM (portal container indicates Shadow DOM)
    if (!portalContainer && open) {
      prevOverflowRef.current = document.body.style.overflow
      document.body.style.overflow = 'hidden'

      return () => {
        document.body.style.overflow = prevOverflowRef.current
      }
    }
  }, [open, portalContainer])

  const transformStyle = open ? 'translateY(0)' : 'translateY(100%)'

  const drawer = (
    <>
      <div
        className={classNames(classes.backdrop, { [classes.open]: open })}
        onClick={onClose}
        role="presentation"
      />
      <div
        className={classNames('Concorde-CartDrawer', classes.drawerContainer, {
          [classes.open]: open
        })}
        style={{
          transform: transformStyle,
          transition: isInitialRender ? 'none' : undefined
        }}
      >
        <div
          aria-hidden={!open}
          aria-label="Cart drawer"
          aria-modal="true"
          className={classNames('Concorde-CartDrawer__Dialog', classes.drawer)}
          ref={drawerRef}
          role="dialog"
          tabIndex={-1}
        >
          {open && (
            <div
              className={classNames(
                'Concorde-CartDrawer__Content',
                classes.content
              )}
              tabIndex={-1}
            >
              {children}
            </div>
          )}
          {open && (
            <div className={classes.closeButtonWrapper}>
              <button
                aria-label={closeLabel}
                className={classes.closeButton}
                onClick={onClose}
                type="button"
              >
                <Icon name="close" size="24px" />
                <span>{closeLabel}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )

  return createPortal(drawer, portalContainer || document.body)
}

CartDrawer.displayName = 'CartDrawer'
