import classNames from 'classnames'
import type { ComponentProps } from 'react'

import classes from './Modal.module.scss'

export const ModalContent = ({ className, ...rest }: ComponentProps<'div'>) => (
  <div
    className={classNames(
      'Concorde-Modal__Content',
      classes.content,
      className
    )}
    {...rest}
  />
)

ModalContent.displayName = 'ModalContent'
