import * as Dialog from '@radix-ui/react-dialog'
import classNames from 'classnames'
import { useCallback, useMemo, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { IconButton, useStyleInjection } from '..'

import classes from './Modal.module.scss'
import type { ModalProps } from './types'

/**
 * Returns focus to whatever was focused before the modal opened.
 *
 * Radix only auto-returns focus when a dialog is opened via `<Dialog.Trigger>`.
 * This modal is controlled through the `open` prop, so we capture the opener
 * ourselves. The capture has to happen during render: by the time effects run,
 * Radix's `FocusScope` (a child, so its effects run first) has already moved
 * focus into the dialog content.
 */
const useReturnFocusOnClose = (open?: boolean) => {
  const openerRef = useRef<HTMLElement | null>(null)
  const wasOpenRef = useRef(false)

  // Capture only on the closed -> open edge, before focus enters the dialog.
  if (open && !wasOpenRef.current && typeof document !== 'undefined') {
    openerRef.current = document.activeElement as HTMLElement | null
  }

  wasOpenRef.current = Boolean(open)

  return useCallback((event: Event) => {
    const opener = openerRef.current

    if (opener?.isConnected) {
      event.preventDefault()
      opener.focus()
    }
  }, [])
}

export const Modal = ({
  className,
  children,
  onClose,
  showCloseButton = false,
  closeButtonClassname,
  bodyClassName,
  onOpenChange,
  open,
  style,
  closeButtonProps,
  ...rest
}: ModalProps) => {
  const { t } = useTranslation()
  const { getPortalContainer } = useStyleInjection()
  const portalContainer = useMemo(
    () => getPortalContainer(),
    [getPortalContainer]
  )

  // Return focus to the element that opened the modal when it closes.
  const handleCloseAutoFocus = useReturnFocusOnClose(open)

  const handleOpenChange = (open: boolean) => {
    /* Until onClose isn't fully removed, only call either onOpenChange or onClose */
    if (onOpenChange) {
      onOpenChange?.(open)
    } else if (onClose) {
      if (!open) {
        onClose?.()
      }
    }
  }

  return (
    <Dialog.Root modal onOpenChange={handleOpenChange} open={open}>
      <Dialog.Portal container={portalContainer}>
        <Dialog.Overlay
          className={classNames(
            'Concorde-Modal Concorde-Modal__Backdrop',
            { 'base-Backdrop-open': open },
            classes.root,
            className
          )}
          // workaround to address radix issue: https://github.com/radix-ui/primitives/issues/1159
          // stop propagation of wheel and touch events to make scroll work in embedded journeys (nested interactive elements)
          onTouchMove={(e) => e.stopPropagation()}
          onWheel={(e) => e.stopPropagation()}
          style={style}
        >
          <Dialog.Content
            className={classNames(
              'Concorde-Modal__Body',
              bodyClassName,
              classes.body
            )}
            onCloseAutoFocus={handleCloseAutoFocus}
            {...rest}
          >
            {children}
            {/* The close button should be rendered after the children, to appear last for screen readers */}
            {showCloseButton && (
              <div
                className={classNames(
                  'Concorde-Modal__CloseButton',
                  classes.closeButtonContainer,
                  closeButtonClassname
                )}
              >
                <Dialog.Close asChild>
                  <IconButton
                    aria-label={t('modal.closeButton', 'Close Modal')}
                    buttonVariant="ghost"
                    className={classes.closeButton}
                    name="close"
                    size="24px"
                    {...closeButtonProps}
                  />
                </Dialog.Close>
              </div>
            )}
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
