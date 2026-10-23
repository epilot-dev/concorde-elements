import classNames from 'classnames'
import type { PropsWithoutRef } from 'react'
import { forwardRef } from 'react'

import classes from './DottedLine.module.scss'
import type { DottedLineProps, DottedLineCSSProperties } from './types'

export const DottedLine = forwardRef<
  HTMLDivElement,
  PropsWithoutRef<DottedLineProps>
>((props, ref) => {
  const { className, color, style, ...rest } = props

  const customColors: DottedLineCSSProperties = {
    '--concorde-dotted-line-custom-color': color
  }

  const customStyles = {
    ...style,
    ...customColors
  }

  return (
    <div
      className={classNames('Concorde-DottedLine', classes.root, className)}
      ref={ref}
      style={customStyles}
      {...rest}
    />
  )
})

DottedLine.displayName = 'DottedLine'
