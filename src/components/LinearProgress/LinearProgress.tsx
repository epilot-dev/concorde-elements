import { Root, Indicator } from '@radix-ui/react-progress'
import classNames from 'classnames'

import classes from './LinearProgress.module.scss'
import type { LinearProgressCSSProperties, LinearProgressProps } from './types'
import { getPercent } from './utils'

export const LinearProgress = (props: LinearProgressProps) => {
  const {
    indicatorProps,
    className,
    height = 4,
    value,
    max = 100,
    style,
    ...rest
  } = props

  const customStyles: LinearProgressCSSProperties = {
    ...style,
    '--concorde-linear-progress-height': `${height}px`,
    '--concorde-linear-progress-progress': value
      ? `translateX(-${100 - getPercent(value, max)}%)`
      : 'translateX(-100%)'
  }

  return (
    <Root
      className={classNames('Concorde-LinearProgress', classes.root, className)}
      max={max}
      style={customStyles}
      value={value}
      {...rest}
    >
      <Indicator
        {...indicatorProps}
        className={classNames(
          'Concorde-LinearProgress__Indicator',
          classes.indicator,
          indicatorProps?.className
        )}
      />
    </Root>
  )
}
