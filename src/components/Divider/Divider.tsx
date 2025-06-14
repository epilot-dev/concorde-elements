import classNames from 'classnames'
import type { PropsWithoutRef } from 'react'
import { forwardRef } from 'react'

import classes from './Divider.module.scss'
import type { DividerProps, DividerCSSProperties } from './types'

export const Divider = forwardRef<
  HTMLDivElement,
  PropsWithoutRef<DividerProps>
>((props, ref) => {
  const {
    className,
    orientation = 'horizontal',
    thickness = 1,
    color,
    style,
    ...rest
  } = props

  const customColors: DividerCSSProperties = {
    '--concorde-divider-thickness': `${thickness}px`,
    '--concorde-divider-custom-color': color
  }

  const customStyles = {
    ...style,
    ...customColors
  }

  return (
    <div
      className={classNames(
        'Concorde-Divider',
        classes.root,
        classes[`orientation-${orientation}`],
        className
      )}
      ref={ref}
      style={customStyles}
      {...rest}
    >
      <hr
        className={classNames('Concorde-Divider__divider', classes.divider)}
      />
    </div>
  )
})

Divider.displayName = 'Divider'
