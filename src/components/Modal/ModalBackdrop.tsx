import classNames from 'classnames'
import { forwardRef } from 'react'

import classes from './Modal.module.scss'
import type { ModalBackdropProps } from './types'

export const ModalBackdrop = forwardRef<HTMLDivElement, ModalBackdropProps>(
  (props, ref) => {
    const {
      open,
      className,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ownerState: _ownerState,
      ...rest
    } = props

    return (
      <div
        className={classNames(
          'Concorde-Modal__Backdrop',
          { 'base-Backdrop-open': open },
          classes.backdrop,
          className
        )}
        ref={ref}
        {...rest}
      />
    )
  }
)

ModalBackdrop.displayName = 'ModalBackdrop'
