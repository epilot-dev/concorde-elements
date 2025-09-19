import * as Dialog from '@radix-ui/react-dialog'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

import { IconButton } from '..'

import classes from './Modal.module.scss'
import type { ModalProps } from './types'

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
      <Dialog.Portal>
        <Dialog.Overlay
          className={classNames(
            'Concorde-Modal Concorde-Modal__Backdrop',
            { 'base-Backdrop-open': open },
            classes.root,
            className
          )}
          style={style}
        >
          <Dialog.Content
            className={classNames(
              'Concorde-Modal__Body',
              bodyClassName,
              classes.body
            )}
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
