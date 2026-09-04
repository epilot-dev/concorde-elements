import classNames from 'classnames'
import { forwardRef, useCallback, useRef, useState } from 'react'
import type { FocusEvent, ForwardedRef } from 'react'

import classes from './TextField.module.scss'
import type { TextFieldCSSProperties, TextFieldProps } from './types'

export const TextField = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  TextFieldProps
>((props, ref) => {
  const {
    label,
    startAdornment,
    endAdornment,
    containerProps,
    className,
    isRequired,
    isDisabled,
    isError,
    helperText,
    color,
    backgroundColor,
    borderColor,
    errorColor,
    style,
    id,
    onBlur,
    onFocus,
    isTextarea,
    ...inputProps
  } = props

  const [isFocused, setIsFocused] = useState(false)

  const customColors: TextFieldCSSProperties = {
    '--concorde-text-field-color': color,
    '--concorde-text-field-background-color': backgroundColor,
    '--concorde-text-field-border-color': borderColor,
    '--concorde-text-field-error-color': errorColor
  }

  const customStyles = {
    ...style,
    ...customColors
  }

  function handleFocus(
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    if (isDisabled) {
      event.preventDefault()

      return
    }
    setIsFocused(true)
    if (isTextarea) resizeTextarea(event.target)
    if (onFocus) onFocus(event)
  }

  function handleBlur(
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    if (isDisabled) {
      event.preventDefault()

      return
    }
    setIsFocused(false)
    if (onBlur) onBlur(event)
  }

  const lockedHeightRef = useRef<number | null>(null)

  const resizeTextarea = useCallback(
    (element: HTMLTextAreaElement | HTMLInputElement) => {
      if (element) {
        element.style.height = 'auto'
        element.style.height = `${element.scrollHeight}px`
      }
    },
    []
  )

  const setRef = useCallback(
    (element: HTMLTextAreaElement | null) => {
      if (element && isTextarea) {
        if (lockedHeightRef.current === null) {
          lockedHeightRef.current = element.clientHeight
        }

        // Pass element to the parent ref, if provided
        if (typeof ref === 'function') {
          ref(element)
        } else if (ref) {
          ;(
            ref as React.MutableRefObject<
              HTMLTextAreaElement | HTMLInputElement | null
            >
          ).current = element
        }
      }
    },
    [ref, isTextarea]
  )

  const expandTextarea = useCallback((element: HTMLTextAreaElement) => {
    if (element) {
      const lockedHeight = lockedHeightRef.current || element.scrollHeight

      element.style.height = `${Math.max(lockedHeight, element.scrollHeight)}px`
    }
  }, [])

  const combinedProps = {
    ...inputProps,
    'aria-hidden': isDisabled,
    className: classNames(
      'Concorde-TextField__Input',
      classes['input'],
      label && classes['input-label'],
      isError && !isFocused && classes['input-error'],
      isDisabled && classes['input-disabled'],
      className
    ),
    disabled: isDisabled,
    id: id,
    onBlur: handleBlur,
    onFocus: handleFocus
  }

  return (
    <div
      {...containerProps}
      className={classNames(
        'Concorde-TextField',
        classes.root,
        containerProps?.className
      )}
      style={customStyles}
    >
      <div
        className={classNames(
          'Concorde-TextField__Input-Root',
          classes['input-root'],
          startAdornment && classes['input-root-start'],
          endAdornment && classes['input-root-end'],
          isDisabled && classes['input-root-disabled'],
          isError && classes['input-root-error'],
          isFocused && classes['input-root-focused'],
          isTextarea && classes['textarea']
        )}
      >
        {startAdornment && (
          <div
            className={classNames(
              'Concorde-TextField__Adornment',
              'Concorde-TextField__Adornment-Start',
              classes['adornment'],
              !isDisabled && isFocused && classes['adornment-focused'],
              isError && classes['adornment-error'],
              isDisabled && classes['adornment-disabled']
            )}
          >
            {startAdornment}
          </div>
        )}
        <div className={classes['input-container']}>
          <label
            className={classNames(
              'Concorde-TextField__Label',
              classes['label'],
              startAdornment && classes['label-start'],
              endAdornment && classes['label-end'],
              isDisabled && classes['label-disabled']
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
          {isTextarea ? (
            <textarea
              {...combinedProps}
              onInput={(e) => expandTextarea(e.currentTarget)}
              ref={setRef}
            />
          ) : (
            <input
              {...combinedProps}
              ref={ref as ForwardedRef<HTMLInputElement>}
            />
          )}
        </div>
        {endAdornment && (
          <div
            className={classNames(
              'Concorde-TextField__Adornment',
              'Concorde-TextField__Adornment-End',
              classes['adornment'],
              classes['adornment-end'],
              !isDisabled && isFocused && classes['adornment-focused'],
              isError && classes['adornment-error'],
              isDisabled && classes['adornment-disabled']
            )}
          >
            {endAdornment}
          </div>
        )}
      </div>
      {helperText && (
        <p
          className={classNames(
            'Concorde-TextField__HelperText',
            classes['helper-text'],
            isError && !isDisabled && classes['error']
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  )
})

TextField.displayName = 'TextField'
