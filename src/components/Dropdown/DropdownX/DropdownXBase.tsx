import classNames from 'classnames'
import type { PropsWithoutRef } from 'react'
import { forwardRef, useEffect, useRef, useState } from 'react'

import { DropdownMenuPortal } from '../DropdownMenuDefaults'
import { DropdownMenuRoot } from '../DropdownMenuRoot'
import type {
  DropdownCSSProperties,
  DropdownXMultiProps,
  DropdownXSingleProps
} from '../types'

import { DropdownMenuTriggerInput } from './DropdownMenuTriggerInput'
import { DropdownMenuX } from './DropdownMenuX'

export const DropdownXBase = forwardRef<
  HTMLUListElement,
  PropsWithoutRef<DropdownXSingleProps | DropdownXMultiProps>
>((props, ref) => {
  const {
    defaultOpen,
    onOpenChange,
    open,
    children,
    options,
    onSelect,
    defaultValue,
    isMenuFullWidth = true,
    value,
    label,
    triggerIcon,
    triggerProps,
    containerProps,
    isClearable,
    clearIcon,
    onClear,
    portalProps,
    id,
    isError,
    isRequired,
    helperText,
    isDisabled,
    inputId,
    displayValue,
    separator = ', ',
    disabledLabels,
    align,
    style,
    readOnly,
    ...rest
  } = props

  // Keep track of dropdown width to sync with menu width
  const dropdownWrapperRef = useRef<HTMLDivElement>(null)
  const [dropdownMenuWidth, setDropdownMenuWidth] = useState('')

  const dropdownMenuContainerRef = useRef<HTMLDivElement>(null)

  // Sync dropdown menu width with dropdown width
  useEffect(() => {
    const dropdown = dropdownWrapperRef.current

    if (!isMenuFullWidth || !dropdown) {
      return
    }

    const syncMenuWidth = () => {
      const width = dropdown.offsetWidth
      const newDropdownWidth = width ? `${width}px` : undefined

      if (newDropdownWidth && dropdownMenuWidth !== newDropdownWidth) {
        setDropdownMenuWidth(newDropdownWidth)
      }
    }

    let observer: ResizeObserver | null = null

    syncMenuWidth()

    try {
      observer = new ResizeObserver(syncMenuWidth)
      observer.observe(dropdown)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log('Dropdown: ResizeObserver error', error)
    }

    return () => {
      if (observer) {
        observer.disconnect()
      }
    }
  }, [isMenuFullWidth, dropdownMenuWidth])

  // Get the default display value of the selected option
  function getDisplayValue() {
    const localValue = value || defaultValue

    if (Array.isArray(localValue)) {
      const labels = localValue?.map(
        (multiValueItem) =>
          options.find((option) => option.value === multiValueItem)?.label || ''
      )

      return labels?.join(separator) || ''
    }

    return options.find((option) => option.value === localValue)?.label || ''
  }

  const localDisplayValue = displayValue || getDisplayValue()
  const labelId = `${inputId}-label`

  const customStyle: DropdownCSSProperties = {
    ...style,
    zIndex: 3,
    '--concorde-dropdown-menu-width': dropdownMenuWidth || '100%'
  }

  return (
    <DropdownMenuRoot
      className="Concorde-DropdownX"
      containerProps={containerProps}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      open={open}
      ref={dropdownWrapperRef}
    >
      <DropdownMenuTriggerInput
        {...triggerProps}
        clearIcon={clearIcon}
        disabled={isDisabled}
        dropdownWidth={dropdownMenuWidth}
        endAdornment={triggerIcon}
        helperText={helperText}
        id={inputId}
        isClearable={Boolean(localDisplayValue) && isClearable}
        isError={isError}
        isRequired={isRequired}
        label={label}
        labelId={labelId}
        onClear={onClear}
        readOnly={readOnly}
        value={localDisplayValue}
      />
      <div
        className={classNames('Concorde-DropdownX__Menu-Wrapper')}
        ref={dropdownMenuContainerRef}
      />
      <DropdownMenuPortal
        container={dropdownMenuContainerRef.current}
        {...portalProps}
      >
        <>
          <DropdownMenuX
            {...rest}
            align={
              // Calucalations for start adornment are not worth the effort
              triggerProps?.startAdornment
                ? 'center'
                : isMenuFullWidth
                  ? 'start'
                  : align
            }
            defaultValue={defaultValue}
            disabledLabels={disabledLabels}
            id={id}
            labelId={labelId}
            onSelect={onSelect}
            options={options}
            ref={ref}
            separator={separator}
            style={customStyle}
            value={value}
          />
          {children}
        </>
      </DropdownMenuPortal>
    </DropdownMenuRoot>
  )
})

DropdownXBase.displayName = 'DropdownXBase'
