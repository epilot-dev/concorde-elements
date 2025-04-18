import classNames from 'classnames'
import { forwardRef } from 'react'

import { useInput } from './hooks/useInput'
import { useInputAutofill } from './hooks/useInputAutofill'
import { useInputSuffix } from './hooks/useInputSuffix'
import classes from './Input.module.scss'
import { InputBase } from './InputBase'
import type { InputProps } from './types'

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    label,
    adornmentProps,
    containerProps,
    isRequired,
    helperText,
    color,
    backgroundColor,
    borderColor,
    errorColor,
    style,
    borderRadius,
    labelColor,
    endAdornment: defaultEndAdornment,
    floatingLabel,
    placeholder,
    ...inputOptions
  } = props

  const { isAutofilled, setRef } = useInputAutofill({ ref })
  const { combinedProps, isActiveState, isFocused, inputSuffixClasses } =
    useInput<'input'>({
      ...inputOptions,
      endAdornment: defaultEndAdornment,
      isAutofilled,
      placeholder
    })

  const value = combinedProps.value

  const { isLabelTouchingBoundary, suffixRef } = useInputSuffix({
    floatingLabel,
    endAdornment: defaultEndAdornment,
    value
  })

  const endAdornment =
    isLabelTouchingBoundary && floatingLabel ? (
      <>
        {floatingLabel}
        {defaultEndAdornment}
      </>
    ) : (
      defaultEndAdornment
    )

  return (
    <InputBase
      adornmentProps={adornmentProps}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderRadius={borderRadius}
      color={color}
      containerProps={containerProps}
      endAdornment={endAdornment}
      errorColor={errorColor}
      helperText={helperText}
      isRequired={isRequired}
      label={label}
      labelColor={labelColor}
      placeholder={placeholder}
      style={style}
      {...inputOptions}
      isActiveState={isActiveState}
      isFocused={isFocused}
    >
      {floatingLabel && (
        <div
          className={classNames(
            classes['input-suffix-container'],
            isLabelTouchingBoundary && classes['input-suffix-container-hidden'],
            inputSuffixClasses
          )}
          ref={suffixRef}
        >
          <span>{value}</span>
          {value && <span>{floatingLabel}</span>}
        </div>
      )}
      <input
        {...combinedProps}
        aria-required={isRequired}
        autoComplete={combinedProps.autoComplete || 'off'}
        ref={setRef}
      />
    </InputBase>
  )
})

Input.displayName = 'Input'
