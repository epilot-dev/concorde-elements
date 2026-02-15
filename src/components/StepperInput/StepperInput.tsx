import classNames from 'classnames'
import { forwardRef } from 'react'

import { IconButton } from '../'
import { TextField } from '../TextField/TextField'

import classes from './StepperInput.module.scss'
import type {
  StepperInputAdornmentProps,
  StepperInputProps,
  StepperInputCSSProperties
} from './types'

export const StepperInput = forwardRef<HTMLInputElement, StepperInputProps>(
  (props, ref) => {
    const {
      onDecrementClick,
      onIncrementClick,
      decrementAdornmentProps,
      incrementAdornmentProps,
      label,
      isDisabled,
      isError,
      isRequired,
      errorColor,
      borderColor,
      id,
      style,
      containerProps,
      inputContainerProps,
      adornmentProps,
      isFullWidth,
      ...rest
    } = props

    const customColors: StepperInputCSSProperties = {
      '--concorde-stepper-field-error-color': errorColor,
      '--concorde-stepper-field-border-color': borderColor
    }

    const customStyles = {
      ...style,
      ...customColors
    }

    return (
      <div
        {...containerProps}
        className={classNames(
          'Concorde-StepperInput',
          classes.root,
          isFullWidth && classes['root--fullWidth'],
          containerProps?.className
        )}
        style={customStyles}
      >
        {label && (
          <label
            className={classNames(
              'Concorde-StepperInput__Label',
              classes['label']
            )}
            htmlFor={id}
          >
            {label}
            {isRequired && (
              <span
                aria-hidden="true"
                className={classNames(
                  isError && !isDisabled && classes['error']
                )}
              >
                &thinsp;*
              </span>
            )}
          </label>
        )}
        <TextField
          {...rest}
          borderColor={borderColor}
          containerProps={{
            ...inputContainerProps,
            className: classNames(
              'Concorde-StepperInput__InputField-Root',
              classes['input-field-root'],
              isFullWidth && classes['input-field-root--fullWidth'],
              inputContainerProps?.className
            )
          }}
          endAdornment={
            <StepperInputAdornment
              aria-label="Add"
              onClick={onIncrementClick}
              {...adornmentProps}
              {...incrementAdornmentProps}
              className={classNames(
                'Concorde-StepperInput__Adornment-Right',
                classes['adornment-right'],
                adornmentProps?.className
              )}
              id={id && `${id}_add_button`}
              name="add"
            />
          }
          errorColor={errorColor}
          id={id}
          isDisabled={isDisabled}
          isError={isError}
          min={0}
          ref={ref}
          startAdornment={
            <StepperInputAdornment
              aria-label="Subtract"
              onClick={onDecrementClick}
              {...adornmentProps}
              {...decrementAdornmentProps}
              className={classNames(
                'Concorde-StepperInput__Adornment-Left',
                classes['adornment-left'],
                adornmentProps?.className
              )}
              id={id && `${id}_remove_button`}
              name="remove"
            />
          }
          step={1}
          style={style}
          type="number"
        />
      </div>
    )
  }
)

const StepperInputAdornment = ({
  children,
  className,
  ...adornmentProps
}: StepperInputAdornmentProps) => {
  return (
    <IconButton
      {...adornmentProps}
      className={classNames(
        'Concorde-StepperInput__Adornment',
        classes['adornment'],
        className
      )}
      color="auto"
      label={children}
    />
  )
}

StepperInput.displayName = 'StepperInput'
