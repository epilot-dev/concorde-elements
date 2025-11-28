import classNames from 'classnames'
import { forwardRef, type PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'

import { Reveal } from '..'

import { useInputBase } from './hooks/useInputBase'
import classes from './Input.module.scss'
import type {
  InputAdornmentProps,
  InputBaseProps,
  InputCSSProperties
} from './types'

export const InputBase = (props: PropsWithChildren<InputBaseProps>) => {
  const { t } = useTranslation()
  const {
    label,
    startAdornment,
    endAdornment,
    adornmentProps,
    containerProps,
    isRequired,
    isDisabled,
    isTriggerInput,
    isError,
    helperText,
    color,
    backgroundColor,
    borderColor,
    errorColor,
    placeholder,
    style,
    id,
    borderRadius,
    isTextarea,
    labelId,
    labelColor,
    value,
    defaultValue,
    variant = 'outlined',
    children,
    isFocused,
    isActiveState,
    readOnly
  } = props

  const isFilledVariant = variant === 'filled'

  const {
    inputContainerRef,
    labelWidthRef,
    startAdornmentWidthRef,
    startAdornmentRef,
    isLabelEmpty,
    labelRef
  } = useInputBase({
    label,
    startAdornment,
    isRequired,
    value,
    defaultValue
  })

  const customColors: InputCSSProperties = {
    '--concorde-input-color': color,
    '--concorde-input-background-color': backgroundColor,
    '--concorde-input-border-color': borderColor,
    '--concorde-input-error-color': errorColor,
    '--concorde-input-label-color': labelColor,
    '--concorde-input-border-radius':
      borderRadius !== undefined ? `${borderRadius}px` : undefined,
    '--concorde-input-label-width': labelWidthRef.current || undefined,
    '--concorde-input-start-adornment-width':
      startAdornmentWidthRef.current || undefined
  }

  const customStyles = {
    ...style,
    ...containerProps?.style,
    ...customColors
  }

  return (
    <div
      {...containerProps}
      className={classNames(
        'Concorde-Input',
        isTextarea && 'Concorde-Textarea',
        classes.root,
        containerProps?.className,
        isDisabled && classes.disabled
      )}
      ref={inputContainerRef}
      style={customStyles}
    >
      <div
        className={classNames(
          'Concorde-Input__Input-Root',
          classes['input-root'],
          startAdornment && classes['input-root-start'],
          endAdornment && classes['input-root-end'],
          isTextarea && classes['input-root-textarea']
        )}
      >
        {startAdornment && (
          <InputAdornment
            isDisabled={isDisabled}
            isError={isError}
            {...adornmentProps}
            className={classNames(
              'Concorde-Input__Adornment-Start',
              adornmentProps?.className
            )}
            isFocused={isFocused}
            isTextarea={isTextarea}
            isTriggerInput={isTriggerInput}
            ref={startAdornmentRef}
          >
            {startAdornment}
          </InputAdornment>
        )}
        <div
          aria-labelledby={readOnly ? `${id}-readonly` : undefined}
          className={classes['input-container']}
        >
          <label
            className={classNames(
              'Concorde-Input__Label',
              classes['label'],
              startAdornment && classes['label-start'],
              endAdornment && classes['label-end'],
              isDisabled && classes['label-disabled'],
              isFilledVariant && classes['label-filled'],
              isError && classes['label-error'],
              !isDisabled && isFocused && classes['label-focused'],
              isActiveState && classes['label-valued'],
              isLabelEmpty && classes['label-empty'],
              isTextarea && classes['label-textarea'],
              isRequired && classes['label-required'],
              placeholder && classes['label-valued']
            )}
            htmlFor={id}
            id={labelId}
            ref={labelRef}
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
          {children}
        </div>
        {endAdornment && (
          <InputAdornment
            isDisabled={isDisabled}
            isError={isError}
            {...adornmentProps}
            className={classNames(
              'Concorde-Input__Adornment-End',
              adornmentProps?.className
            )}
            isFocused={isFocused}
            isTextarea={isTextarea}
            isTriggerInput={isTriggerInput}
          >
            {endAdornment}
          </InputAdornment>
        )}
        <fieldset
          className={classNames(
            classes.fieldset,
            isError && classes['fieldset-error'],
            isDisabled && classes['fieldset-disabled'],
            !isDisabled && isFocused && classes['fieldset-focused'],
            readOnly && classes['fieldset-readonly']
          )}
        >
          <legend
            className={classNames(
              classes.legend,
              isRequired && classes['legend-required'],
              isActiveState && classes['legend-focused'],
              isLabelEmpty && classes['legend-no-label'],
              isFilledVariant && classes['legend-filled'],
              placeholder && classes['legend-focused']
            )}
          >
            <span>{label || placeholder}</span>
          </legend>
        </fieldset>
        <div className={classNames(classes['input-background'])} />
      </div>

      <Reveal isSubtle show={helperText}>
        <p
          className={classNames(
            'Concorde-Input__HelperText',
            classes['helper-text'],
            isError && !isDisabled && classes['error']
          )}
          id={isError ? `${id}-errorMessage` : undefined}
        >
          {helperText}
        </p>
      </Reveal>

      {readOnly && (
        <span className="sr-only" id={`${id}-readonly`}>
          {t('input.readonly')}
        </span>
      )}
    </div>
  )
}

export const InputAdornment = forwardRef<HTMLDivElement, InputAdornmentProps>(
  (props, ref) => {
    const {
      isError,
      isDisabled,
      isFocused,
      className,
      isTriggerInput,
      children,
      isTextarea,
      ...rest
    } = props

    return (
      <div
        {...rest}
        className={classNames(
          'Concorde-Input__Adornment',
          className,
          classes['adornment'],
          !isDisabled && isFocused && classes['adornment-focused'],
          isError && classes['adornment-error'],
          isTriggerInput && classes['adornment-trigger'],
          isDisabled && classes['adornment-disabled'],
          isTextarea && classes['adornment-textarea']
        )}
        ref={ref}
      >
        {children}
      </div>
    )
  }
)

InputAdornment.displayName = 'InputAdornment'
