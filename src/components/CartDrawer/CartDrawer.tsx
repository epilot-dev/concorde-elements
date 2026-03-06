import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import { Icon } from '../Icon'

import classes from './CartDrawer.module.scss'
import type { CartDrawerProps } from './types'

export const CartDrawer = ({
  open,
  onClose,
  closeLabel = 'Close',
  children
}: CartDrawerProps) => {
  const drawerRef = useRef<HTMLDivElement>(null)
  const [isInitialRender, setIsInitialRender] = useState(true)

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

  const transformStyle = open ? 'translateY(0)' : 'translateY(100%)'

  const drawer = (
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
      <div
        className={classNames(classes.backdrop, { [classes.open]: open })}
        onClick={onClose}
        role="presentation"
      />
    </div>
  )

  return createPortal(drawer, document.body)
}

CartDrawer.displayName = 'CartDrawer'
