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
    label,
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

  const line = (
    <hr className={classNames('Concorde-Divider__divider', classes.divider)} />
  )

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
      {label != null ? (
        <>
          {line}
          <span
            className={classNames('Concorde-Divider__label', classes.label)}
          >
            {label}
          </span>
          {line}
        </>
      ) : (
        line
      )}
    </div>
  )
})

Divider.displayName = 'Divider'
