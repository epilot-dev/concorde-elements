import classNames from 'classnames'
import { forwardRef } from 'react'

import classes from './Slider.module.scss'
import type { SliderCSSProperties, SliderProps } from './types'

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value))

const toFillPercentage = (value: number, min: number, max: number) =>
  max > min ? ((clamp(value, min, max) - min) / (max - min)) * 100 : 0

const defaultFormatValue = (value: number) => String(value)

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  (props, ref) => {
    const {
      value,
      min = 0,
      max = 100,
      step = 1,
      onChange,
      onValueCommitted,
      formatValue = defaultFormatValue,
      showScale,
      isDisabled,
      isError,
      readOnly,
      className,
      style,
      children,
      ...rest
    } = props

    const displayedValue = clamp(value, min, max)

    const fillStyle: SliderCSSProperties = {
      ...style,
      '--fill': `${toFillPercentage(value, min, max)}%`
    } as SliderCSSProperties

    return (
      <div
        className={classNames(
          'Concorde-Slider',
          classes.root,
          isDisabled && classes['root--disabled'],
          isError && classes['root--error'],
          readOnly && classes['root--readOnly'],
          className
        )}
        style={fillStyle}
      >
        <input
          aria-invalid={isError || undefined}
          aria-readonly={readOnly || undefined}
          aria-valuetext={formatValue(displayedValue)}
          {...rest}
          className={classNames('Concorde-Slider__Input', classes.input)}
          disabled={isDisabled}
          max={max}
          min={min}
          onChange={(event) => {
            if (readOnly) return

            onChange?.(event.target.valueAsNumber)
          }}
          onKeyUp={(event) => {
            rest.onKeyUp?.(event)
            onValueCommitted?.(event.currentTarget.valueAsNumber)
          }}
          onPointerUp={(event) => {
            rest.onPointerUp?.(event)
            onValueCommitted?.(event.currentTarget.valueAsNumber)
          }}
          ref={ref}
          step={step}
          type="range"
          value={displayedValue}
        />
        {showScale && (
          <div
            aria-hidden="true"
            className={classNames('Concorde-Slider__Scale', classes.scale)}
          >
            <span>{formatValue(min)}</span>
            <span>{formatValue(max)}</span>
          </div>
        )}
        {children}
      </div>
    )
  }
)

Slider.displayName = 'Slider'
