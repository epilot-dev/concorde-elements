import classNames from 'classnames'
import { forwardRef } from 'react'

import classes from './Slider.module.scss'
import type { SliderCSSProperties, SliderProps } from './types'

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value))

/** Decimal places of a number, including ones written in exponent form. */
const decimalPlacesOf = (value: number) => {
  const [mantissa, exponent = '0'] = String(value).split('e')

  return Math.max(0, (mantissa.split('.')[1] ?? '').length - Number(exponent))
}

type Rounding = (steps: number) => number

/**
 * The position the rail can show for a value: clamped to the rail, then
 * rounded to a step counted from `min`, never past `max`. Rounding to the
 * nearest step (ties upwards) mirrors how browsers sanitize a range input's
 * value, so the thumb, the fill and the value reported back always agree.
 */
const snapToStep = (
  value: number,
  min: number,
  max: number,
  step: number,
  round: Rounding = Math.round
) => {
  const clamped = clamp(value, min, max)

  if (!(step > 0) || !Number.isFinite(step)) return clamped

  const precision = Math.max(decimalPlacesOf(min), decimalPlacesOf(step))
  const toGrid = (steps: number) =>
    Number((min + steps * step).toFixed(precision))

  // Trims float noise first, so 0.35 / 0.1 still counts as the tie it is.
  const steps = round(Number(((clamped - min) / step).toPrecision(12)))
  const snapped = toGrid(steps)

  return snapped > max ? toGrid(steps - 1) : snapped
}

/** Arrow keys and the way they round a value off the grid onto it. */
const ARROW_KEY_ROUNDING: Record<string, Rounding> = {
  ArrowUp: Math.ceil,
  ArrowRight: Math.ceil,
  ArrowDown: Math.floor,
  ArrowLeft: Math.floor
}

/** Keys that move the thumb towards `max`. */
const UP_KEYS = new Set(['ArrowUp', 'ArrowRight', 'PageUp', 'End'])

/** Keys a focused range input moves its value on. */
const VALUE_KEYS = new Set([
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'PageUp',
  'PageDown',
  'Home',
  'End'
])

const toFillPercentage = (value: number, min: number, max: number) =>
  max > min ? ((value - min) / (max - min)) * 100 : 0

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

    /**
     * A value off the rail's grid (typed into a companion input, say) shows
     * at its exact position: the rail drops its step until the next
     * interaction, as the browser would otherwise round the thumb onto the
     * grid. Values beyond the rail still show clamped to its ends.
     */
    const displayedValue = clamp(value, min, max)
    const snappedValue = snapToStep(value, min, max, step)
    const isOffGrid =
      Number.isFinite(displayedValue) && snappedValue !== displayedValue
    const lastStep = snapToStep(max, min, max, step, Math.floor)

    /**
     * Where a key takes an off-grid value, or undefined to let the browser
     * move it. An arrow lands on the next step its way, rather than a step
     * past the nearest one. Past the last step an off-grid `max` is the
     * only stop left upwards, so the thumb never moves back on those keys.
     */
    const toKeyTarget = (key: string) => {
      if (!isOffGrid || readOnly || isDisabled) return undefined
      if (displayedValue > lastStep && UP_KEYS.has(key)) return max

      const round = ARROW_KEY_ROUNDING[key]

      return round && snapToStep(value, min, max, step, round)
    }

    /**
     * Interacting resnaps an off-grid value: the rail takes its step back
     * before the browser moves the thumb, and the nearest step is reported,
     * so landing on it still reaches `onChange` (the browser fires no change
     * for its own position) and every further move starts from the grid.
     * A clamped value is adopted the same way.
     */
    const adoptSnappedValue = (input: HTMLInputElement) => {
      if (readOnly || isDisabled) return

      if (isOffGrid) input.step = String(step)
      if (snappedValue === value || !Number.isFinite(snappedValue)) return

      onChange?.(snappedValue)
    }

    const fillStyle: SliderCSSProperties = {
      ...style,
      '--fill': `${toFillPercentage(displayedValue, min, max)}%`
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
          onKeyDown={(event) => {
            const target = toKeyTarget(event.key)

            if (target !== undefined) {
              event.preventDefault()
              if (target !== value) onChange?.(target)
            } else if (VALUE_KEYS.has(event.key)) {
              adoptSnappedValue(event.currentTarget)
            }
            rest.onKeyDown?.(event)
          }}
          onKeyUp={(event) => {
            rest.onKeyUp?.(event)
            onValueCommitted?.(event.currentTarget.valueAsNumber)
          }}
          onPointerDown={(event) => {
            adoptSnappedValue(event.currentTarget)
            rest.onPointerDown?.(event)
          }}
          onPointerUp={(event) => {
            rest.onPointerUp?.(event)
            onValueCommitted?.(event.currentTarget.valueAsNumber)
          }}
          ref={ref}
          step={isOffGrid ? 'any' : step}
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
