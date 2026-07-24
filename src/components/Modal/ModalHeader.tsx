import classNames from 'classnames'
import type { ComponentProps } from 'react'

import classes from './Modal.module.scss'

export const ModalHeader = ({ className, ...rest }: ComponentProps<'div'>) => (
  <div
    className={classNames('Concorde-Modal__Header', classes.header, className)}
    {...rest}
  />
)
