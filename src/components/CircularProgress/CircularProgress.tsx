import classNames from 'classnames'

import classes from './CircularProgress.module.scss'
import type {
  CircularProgressCSSProperties,
  CircularProgressProps
} from './types'

export const CircularProgress: React.FC<CircularProgressProps> = (props) => {
  const {
    size = 40,
    thickness = 3.6,
    value = 30,
    color,
    speed,
    className,
    variant
  } = props
  const radius = (size - thickness) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (value / 100) * circumference

  const customStyles: CircularProgressCSSProperties = {
    '--concorde-circular-progress-size': `${size}px`,
    '--concorde-circular-progress-speed': speed
  }

  return (
    <div
      className={classNames(
        'Concorde-CircularProgress',
        classes.container,
        className
      )}
      style={customStyles}
    >
      <svg className={classes.svg} viewBox={`0 0 ${size} ${size}`}>
        {/* Background circle */}
        <circle
          className={classNames(
            classes.circleBg,
            variant && classes[`variant-${variant}`]
          )}
          cx={size / 2}
          cy={size / 2}
          fill="none"
          r={radius}
          strokeWidth={thickness}
        />
        {/* Progress circle */}
        <circle
          className={classNames(
            classes.circle,
            variant && !color && classes[`variant-${variant}`]
          )}
          cx={size / 2}
          cy={size / 2}
          fill="none"
          r={radius}
          stroke={color || `var(--concorde-primary-color)`}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeWidth={thickness}
        />
      </svg>
    </div>
  )
}
