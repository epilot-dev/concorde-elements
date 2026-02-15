import classNames from 'classnames'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { IconButton, Tooltip } from '..'

import classes from './Rating.module.scss'
import type { RatingProps } from './types'
import { getTabIndex, useHoveredValue, useRatingKeyboard } from './utils'

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
    iconClassName
  } = props

  const { t } = useTranslation()
  const { containerRef } = useRatingKeyboard()

  const hoveredValue = useHoveredValue(containerRef, value)

  const ratingOptions = useMemo(() => {
    return Array.from({ length: max }, (_, index) => {
      const isSelected =
        hoveredValue !== undefined ? index <= hoveredValue : false

      const tabIndex = getTabIndex(value, isSelected, index)

      return (
        <Tooltip
          key={index}
          sideOffset={2}
          title={labels?.[index] || `${index + 1} ${iconName} rating`}
        >
          <IconButton
            aria-checked={isSelected}
            aria-label={labels?.[index] || `${index + 1} ${iconName} rating`}
            aria-labelledby={undefined}
            className={classNames(
              'Concorde-Rating__Icon-Button',
              classes.ratingIcon,
              isSelected && classes.ratingIconSelected
            )}
            data-rating-index={index}
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
  }, [max, iconName, labels, id, onChange, value, iconClassName, hoveredValue])

  return (
    <div
      aria-label={`${name || ''}. ${t('arrow_keys_control')}.`}
      className={classNames('Concorde-Rating', classes.root, className)}
      id={`${id}-rating-group`}
      ref={containerRef}
      role="radiogroup"
    >
      {ratingOptions}
    </div>
  )
}

export default Rating
