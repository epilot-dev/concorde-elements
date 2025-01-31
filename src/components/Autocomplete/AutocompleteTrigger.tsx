import classNames from 'classnames'
import type { PropsWithoutRef } from 'react'
import { forwardRef } from 'react'

import { Input, IconButton, ExpandIcon, CircularProgress } from '..'

import type { AutoCompleteTriggerProps } from './types'

export const AutoCompleteTriggerInput = forwardRef<
  HTMLInputElement,
  PropsWithoutRef<AutoCompleteTriggerProps>
>((props, ref) => {
  const {
    className,
    isFocused,
    isOpen = false,
    isClearable,
    isDisabled,
    isLoading,
    endAdornment,
    clearIconProps,
    triggerIconProps,
    readOnly,
    ...rest
  } = props

  const actionButtons = !readOnly && (
    <>
      <IconButton
        label={<ExpandIcon isExpanded={isOpen} />}
        {...triggerIconProps}
        aria-label="Toggle autocomplete menu"
        isDisabled={isDisabled}
        name="expand"
      />
      {isClearable && (
        <IconButton
          {...clearIconProps}
          aria-label="Clear selection"
          isDisabled={isDisabled}
          name="close"
        />
      )}
    </>
  )

  return (
    <Input
      {...rest}
      className={classNames('Concorde-Autocomplete__TriggerInput', className)}
      endAdornment={
        <>
          {endAdornment}
          {isLoading ? (
            <CircularProgress
              color="currentColor"
              size={20}
              speed="0.5s"
              thickness={1.5}
            />
          ) : (
            actionButtons
          )}
        </>
      }
      isDisabled={isDisabled}
      isTriggerInput
      isTriggered={isFocused}
      readOnly={readOnly}
      ref={ref}
    />
  )
})

AutoCompleteTriggerInput.displayName = 'AutoCompleteTriggerInput'
