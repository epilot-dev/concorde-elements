import classNames from 'classnames'

import classes from './Modal.module.scss'
import type { ModalContentProps } from './types'

export const ModalContent = (props: ModalContentProps) => {
  const { children, className, ...rest } = props

  return (
    <div
      className={classNames(
        'Concorde-Modal__Content',
        classes.content,
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

ModalContent.displayName = 'ModalContent'
