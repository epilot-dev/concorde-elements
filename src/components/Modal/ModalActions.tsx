import classNames from 'classnames'
import type { ComponentProps } from 'react'

import classes from './Modal.module.scss'

export const ModalActions = ({ className, ...rest }: ComponentProps<'div'>) => (
  <div
    className={classNames(
      'Concorde-Modal__Actions',
      classes.actions,
      className
    )}
    {...rest}
  />
)

ModalActions.displayName = 'ModalActions'
