import { Modal as BaseModal } from '@mui/base/Modal'
import classNames from 'classnames'

import type { IconButtonProps } from '..'
import { IconButton } from '..'

import classes from './Modal.module.scss'
import { ModalBackdrop } from './ModalBackdrop'
import type { ModalProps } from './types'

export const Modal = (props: ModalProps) => {
  const {
    className,
    children,
    onClose,
    showCloseButton = false,
    ...rest
  } = props

  return (
    <BaseModal
      {...rest}
      className={classNames('Concorde-Modal', classes.root, className)}
      onClose={onClose}
      slots={{ backdrop: ModalBackdrop }}
    >
      <div className={classNames('Concorde-Modal__Body', classes.body)}>
        {showCloseButton && onClose && (
          <div
            className={classNames(
              'Concorde-Modal__CloseButton',
              classes.closeButton
            )}
          >
            <IconButton
              aria-label="Close Modal"
              color="var(--concorde-primary-text)"
              name="close"
              onClick={onClose as IconButtonProps['onClick']}
              size="24px"
            />
          </div>
        )}
        {children}
      </div>
    </BaseModal>
  )
}
