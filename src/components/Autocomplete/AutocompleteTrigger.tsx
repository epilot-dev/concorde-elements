import classNames from 'classnames'
import type { ChangeEvent, PropsWithoutRef } from 'react'
import { forwardRef, useRef } from 'react'

import type { NumberInputProps } from '..'
import {
  Input,
  IconButton,
  ExpandIcon,
  CircularProgress,
  NumberInput
} from '..'

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
    isNumberInput,
    isFormattingEnabled,
    isRequired,
    ...rest
  } = props
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)

  const actionButtons = !readOnly && (
    <>
      <IconButton
        label={<ExpandIcon isExpanded={isOpen} />}
        {...triggerIconProps}
        aria-label="Toggle autocomplete menu"
        isDisabled={isDisabled}
        name="expand"
        ref={closeButtonRef}
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

  const commonProps = {
    ...rest,
    className: classNames('Concorde-Autocomplete__TriggerInput', className),
    endAdornment: (
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
    ),
    isDisabled,
    isTriggerInput: true,
    isTriggered: isFocused,
    readOnly,
    isRequired,
    ref
  }

  if (isNumberInput) {
    return (
      <NumberInput
        {...commonProps}
        defaultValue={
          commonProps.defaultValue as NumberInputProps['defaultValue']
        }
        isFormattingEnabled={isFormattingEnabled}
        onChange={(value) => {
          commonProps.onChange?.({
            target: { value }
          } as ChangeEvent<HTMLInputElement>)
        }}
        value={commonProps.value as NumberInputProps['value']}
      />
    )
  }

  return <Input {...commonProps} />
})

AutoCompleteTriggerInput.displayName = 'AutoCompleteTriggerInput'
