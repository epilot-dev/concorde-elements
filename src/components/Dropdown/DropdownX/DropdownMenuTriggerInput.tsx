import { Trigger as DropdownMenuTriggerBase } from '@radix-ui/react-dropdown-menu'
import classNames from 'classnames'
import type { PropsWithoutRef } from 'react'
import { forwardRef, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { ExpandIcon, Icon, Input } from '../..'
import type { DropdownMenuTriggerProps } from '../types'

import classes from './DropdownMenuTriggerInput.module.scss'

export const DropdownMenuTriggerInput = forwardRef<
  HTMLInputElement,
  PropsWithoutRef<DropdownMenuTriggerProps>
>(
  (
    {
      className,
      disabled,
      onClear,
      clearIcon,
      isClearable,
      readOnly,
      dropdownWidth,
      ...props
    },
    ref
  ) => {
    return (
      <DropdownMenuTriggerBase
        asChild
        {...props}
        className={classNames(
          'Concorde-DropdownMenuTrigger',
          classes.root,
          disabled && classes.disabled,
          readOnly && classes.readonly,
          className
        )}
        disabled={disabled}
      >
        <TriggerInput
          {...props}
          clearIcon={clearIcon}
          dropdownWidth={dropdownWidth}
          isClearable={isClearable}
          onClear={onClear}
          readOnly={readOnly}
          ref={ref}
        />
      </DropdownMenuTriggerBase>
    )
  }
)

export const TriggerInput = forwardRef<
  HTMLInputElement,
  PropsWithoutRef<DropdownMenuTriggerProps>
>((props, ref) => {
  const {
    className,
    isDisabled,
    disabled,
    onPointerDown,
    clearIcon,
    onClear,
    isClearable,
    endAdornment,
    readOnly,
    value,
    dropdownWidth,
    style,
    startAdornment,
    ...rest
  } = props

  const { t } = useTranslation()

  const isOpen = props['data-state'] === 'open'
  const isDisabledButton =
    isDisabled || disabled || props['data-disabled'] === ''

  const dropdownEndAdornmentRef = useRef<HTMLDivElement>(null)
  const adornmentWidthRef = useRef<string | undefined>(undefined)

  // Get the width of the adornments
  useEffect(() => {
    const updateInputWidth = () => {
      if (!dropdownEndAdornmentRef.current) return

      const endAdornmentContainer = dropdownEndAdornmentRef.current

      if (endAdornmentContainer) {
        const endAdornmentWidth =
          (endAdornmentContainer.parentNode as HTMLElement).offsetWidth || 0

        let startAdornmentWidth = 0

        if (startAdornment) {
          const inputRoot = endAdornmentContainer?.parentNode
            ?.parentNode as HTMLElement
          const startAdornmentContainer = inputRoot
            ?.childNodes[0] as HTMLDivElement

          startAdornmentWidth = startAdornmentContainer?.offsetWidth || 0
        }

        const totalAdornmentWidth = endAdornmentWidth + startAdornmentWidth

        adornmentWidthRef.current =
          totalAdornmentWidth !== undefined
            ? `${totalAdornmentWidth}px`
            : undefined
      }
    }

    updateInputWidth()

    const resizeObserver = new ResizeObserver(updateInputWidth)

    if (dropdownEndAdornmentRef.current) {
      resizeObserver.observe(dropdownEndAdornmentRef.current)
    }

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect()
      }
    }
  }, [isClearable, startAdornment])

  const customStyle = {
    ...style,
    ...(adornmentWidthRef.current && {
      '--concorde-dropdown-input-adornment-width': adornmentWidthRef.current,
      '--concorde-dropdown-input-width': dropdownWidth,
      '--concorde-dropdown-input-spacing-multiplier': startAdornment ? 2 : 1
    })
  }

  return (
    <Input
      {...rest}
      className={classNames('Concorde-DropdownMenuTriggerInput', className)}
      endAdornment={
        endAdornment || (
          <div className={classes.endAdornment} ref={dropdownEndAdornmentRef}>
            <ExpandIcon
              aria-hidden={false}
              aria-label={t('dropdown.toggleMenu', 'Expand dropdown')}
              className={classNames(readOnly && classes.readonlyIcon)}
              isExpanded={isOpen}
              onClick={readOnly ? undefined : onPointerDown}
              role="button"
              tabIndex={0}
            />
            {isClearable &&
              !readOnly &&
              (clearIcon || (
                <Icon
                  aria-hidden={false}
                  aria-label={t('dropdown.clearSelection', 'Clear selection')}
                  name="close"
                  onClick={onClear}
                  role="button"
                  tabIndex={0}
                />
              ))}
          </div>
        )
      }
      isDisabled={isDisabledButton}
      isTriggerInput
      isTriggered={isOpen}
      onPointerDown={readOnly ? undefined : onPointerDown}
      readOnly={readOnly}
      ref={ref}
      startAdornment={startAdornment}
      style={customStyle}
      value={value}
    />
  )
})

TriggerInput.displayName = 'TriggerInput'
DropdownMenuTriggerInput.displayName = 'DropdownMenuTriggerInput'
