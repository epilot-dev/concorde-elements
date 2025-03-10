import classNames from 'classnames'

import classes from './Modal.module.scss'
import type { ModalActionsProps } from './types'

export const ModalActions = (props: ModalActionsProps) => {
  const { children, className, ...rest } = props

  return (
    <div
      className={classNames(
        'Concorde-Modal__Actions',
        classes.actions,
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

ModalActions.displayName = 'ModalActions'
