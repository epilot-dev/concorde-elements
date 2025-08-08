import classNames from 'classnames'

import classes from './Modal.module.scss'
import type { ModalHeaderProps } from './types'

export const ModalHeader = (props: ModalHeaderProps) => {
  const { children, className, ...rest } = props

  return (
    <div
      className={classNames(
        'Concorde-Modal__Header',
        classes.header,
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
