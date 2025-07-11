import classNames from 'classnames'
import { useMemo } from 'react'

import { IconButton, Tooltip } from '..'

import classes from './Rating.module.scss'
import type { RatingProps } from './types'

export const Rating = (props: RatingProps) => {
  const {
    value,
    max = 5,
    onChange,
    iconName = 'star',
    className,
    labels,
    id,
    name,
    iconClassName,
    tabIndex
  } = props

  const ratingOptions = useMemo(() => {
    return Array.from({ length: max }, (_, index) => {
      const isSelected = value !== undefined ? index <= value : false

      return (
        <Tooltip key={index} sideOffset={2} title={labels?.[index] || index}>
          <IconButton
            aria-checked={isSelected}
            aria-label={labels?.[index] || `${index} ${iconName} rating`}
            className={classNames(
              'Concorde-Rating__Icon-Button',
              classes.ratingIcon,
              isSelected && classes.ratingIconSelected
            )}
            iconClassName={iconClassName}
            id={`${id}-${index}-rating`}
            isFilled
            name={iconName}
            onClick={() => onChange?.(index)}
            role="radio"
            size="48px"
            tabIndex={tabIndex}
          />
        </Tooltip>
      )
    })
  }, [max, iconName, labels, id, onChange, value, iconClassName, tabIndex])

  return (
    <div
      aria-label={name}
      className={classNames('Concorde-Rating', classes.root, className)}
      role="radiogroup"
    >
      {ratingOptions}
    </div>
  )
}

export default Rating
