import classNames from 'classnames'
import type { ChangeEvent, PropsWithoutRef } from 'react'
import { forwardRef, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import type { NumberInputProps } from '..'
import {
  CircularProgress,
  ExpandIcon,
  IconButton,
  Input,
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

  const { t } = useTranslation()

  const actionButtons = !readOnly && (
    <>
      <IconButton
        label={<ExpandIcon isExpanded={isOpen} />}
        {...triggerIconProps}
        aria-label={
          isOpen
            ? t('autocomplete.closeMenu', 'Close autocomplete menu')
            : t('autocomplete.openMenu', 'Open autocomplete menu')
        }
        isDisabled={isDisabled}
        name="expand"
        ref={closeButtonRef}
        tabIndex={0}
      />
      {isClearable && (
        <IconButton
          aria-label={t('autocomplete.clearSelection', 'Clear selection')}
          {...clearIconProps}
          isDisabled={isDisabled}
          name="close"
          tabIndex={0}
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
