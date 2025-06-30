import { Modal as BaseModal } from '@mui/base/Modal'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

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
    closeButtonClassname,
    bodyClassName,
    ...rest
  } = props

  const { t } = useTranslation()

  return (
    <BaseModal
      {...rest}
      className={classNames('Concorde-Modal', classes.root, className)}
      onClose={onClose}
      slots={{ backdrop: ModalBackdrop }}
    >
      <div
        className={classNames(
          'Concorde-Modal__Body',
          bodyClassName,
          classes.body
        )}
      >
        {showCloseButton && onClose && (
          <div
            className={classNames(
              'Concorde-Modal__CloseButton',
              classes.closeButton,
              closeButtonClassname
            )}
          >
            <IconButton
              aria-label={t('modal.closeButton', 'Close Modal')}
              color="var(--concorde-primary-text)"
              name="close"
              onClick={onClose}
              size="24px"
            />
          </div>
        )}
        {children}
      </div>
    </BaseModal>
  )
}
