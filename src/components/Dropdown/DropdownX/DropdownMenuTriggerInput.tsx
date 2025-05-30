import { Trigger as DropdownMenuTriggerBase } from '@radix-ui/react-dropdown-menu'
import classNames from 'classnames'
import type { PropsWithoutRef } from 'react'
import { forwardRef } from 'react'

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
    ...rest
  } = props
  const isOpen = props['data-state'] === 'open'
  const isDisabledButton =
    isDisabled || disabled || props['data-disabled'] === ''

  return (
    <Input
      {...rest}
      className={classNames('Concorde-DropdownMenuTriggerInput', className)}
      endAdornment={
        endAdornment || (
          <>
            <ExpandIcon
              aria-hidden={false}
              aria-label="Toggle dropdown menu"
              className={classNames(readOnly && classes.readonlyIcon)}
              isExpanded={isOpen}
              onClick={readOnly ? undefined : onPointerDown}
              role="button"
              tabIndex={-1}
            />
            {isClearable &&
              !readOnly &&
              (clearIcon || (
                <Icon
                  aria-hidden={false}
                  aria-label="Clear selection"
                  name="close"
                  onClick={onClear}
                  role="button"
                  tabIndex={-1}
                />
              ))}
          </>
        )
      }
      isDisabled={isDisabledButton}
      isTriggerInput
      isTriggered={isOpen}
      onPointerDown={readOnly ? undefined : onPointerDown}
      readOnly={readOnly}
      ref={ref}
    />
  )
})

TriggerInput.displayName = 'TriggerInput'
DropdownMenuTriggerInput.displayName = 'DropdownMenuTriggerInput'
