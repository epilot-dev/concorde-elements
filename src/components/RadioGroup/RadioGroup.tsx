import { Root as RadioGroupRootBase } from '@radix-ui/react-radio-group'
import classNames from 'classnames'
import type { PropsWithoutRef, ReactElement } from 'react'
import { cloneElement, forwardRef, isValidElement } from 'react'
import flattenChildren from 'react-keyed-flatten-children'

import { Radio, Typography } from '..'

import classes from './RadioGroup.module.scss'
import type { RadioGroupCSSProperties, RadioGroupProps } from './types'

export const RadioGroup = forwardRef<
  HTMLDivElement,
  PropsWithoutRef<RadioGroupProps>
>((props, ref) => {
  const {
    children,
    className,
    color,
    errorColor,
    uncheckedColor,
    isError,
    isDisabled,
    labelPlacement,
    size,
    isRequired,
    orientation,
    onChange,
    error,
    scale = 4,
    id,
    ...rest
  } = props

  const customStyles: RadioGroupCSSProperties = {
    '--concorde-radio-group-scale': scale
  }

  return (
    <>
      <div
        className={classNames(classes.container, 'Concorde-RadioGroup')}
        style={customStyles}
      >
        <RadioGroupRootBase
          {...rest}
          className={classNames(
            classes.root,
            orientation && classes[`orientation-${orientation}`],
            className
          )}
          id={id}
          onValueChange={onChange}
          ref={ref}
        >
          {flattenChildren(children).map((child) => {
            // If it's a Radio, pass Radio props to it
            if (isValidElement(child) && child.type === Radio) {
              return cloneElement(child as ReactElement<RadioGroupProps>, {
                size,
                color,
                errorColor,
                uncheckedColor,
                isDisabled,
                labelPlacement
              })
            }

            return child
          })}
        </RadioGroupRootBase>
        {isRequired && (
          <span
            aria-hidden="true"
            className={classNames(error && classes.error, classes.asterisk)}
          >
            &thinsp;*
          </span>
        )}
      </div>

      {isError && error && (
        <Typography
          as="p"
          className={classes.errorText}
          id={isError ? `${id}-errorMessage` : undefined}
          variant="error"
        >
          {error}
        </Typography>
      )}
    </>
  )
})

RadioGroup.displayName = 'RadioGroup'
