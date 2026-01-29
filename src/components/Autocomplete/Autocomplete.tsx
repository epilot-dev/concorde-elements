import { Unstable_Popup as Popup } from '@mui/base/Unstable_Popup'
import { useAutocomplete } from '@mui/base/useAutocomplete'
import useForkRef from '@mui/utils/useForkRef'
import classNames from 'classnames'
import type { ForwardedRef, PropsWithoutRef } from 'react'
import { forwardRef, useRef } from 'react'

import type {
  AutocompleteProps,
  AutoCompleteTriggerProps,
  AutocompleteValue
} from '..'
import {
  Menu,
  MenuItem,
  MenuItemAdornment,
  Icon,
  MenuItemContent,
  CircularProgress,
  LOADING_STATE
} from '..'

import classes from './Autocomplete.module.scss'
import { AutoCompleteTriggerInput } from './AutocompleteTrigger'
import { useInsufficientSpace } from './utils'

export const Autocomplete = forwardRef(function Autocomplete<
  T,
  isM extends boolean | undefined,
  isNC extends boolean | undefined,
  isFS extends boolean | undefined
>(
  props: AutocompleteProps<T, isM, isNC, isFS>,
  ref: PropsWithoutRef<ForwardedRef<HTMLDivElement>>
) {
  const {
    className,
    style,
    isMenuFullWidth = true,
    label,
    placeholder,
    helperText,
    isDisabled,
    isRequired,
    isNotClearable = false,
    isError,
    inputValue,
    value,
    clearIconProps,
    triggerIconProps,
    triggerProps,
    menuProps,
    getOptionSelected,
    getOptionLabel,
    onBlur,
    noOptionsText,
    isLoading,
    loadingState,
    optionIcons,
    showCheckIcon = false,
    renderOptionLabel,
    freeSolo,
    readOnly,
    isNumberInput,
    isFormattingEnabled,
    ...rest
  } = props

  const {
    getRootProps,
    getInputProps,
    getPopupIndicatorProps,
    getClearProps,
    getListboxProps,
    getOptionProps,
    popupOpen,
    focused,
    anchorEl,
    setAnchorEl,
    groupedOptions
  } = useAutocomplete({
    ...rest,
    readOnly,
    disabled: isDisabled,
    value,
    inputValue,
    getOptionLabel,
    unstable_classNamePrefix: 'Concorde-Autocomplete__Option',
    clearOnEscape: true
  })

  const containerRef = useRef<HTMLDivElement>(null)
  const rootRef = useForkRef(useForkRef(ref, containerRef), setAnchorEl)
  const hasInsufficientSpace = useInsufficientSpace({
    isOpen: popupOpen,
    containerRef: containerRef
  })

  function getOptionSelectedDefault(
    option: T,
    value?: AutocompleteValue<T, isM, isNC, isFS>
  ) {
    return Array.isArray(value) ? value.includes(option) : option === value
  }

  const { className: menuClassName, ...menuRest } = menuProps || {}

  const isOptionsLoading =
    isLoading ||
    loadingState === LOADING_STATE.PENDING ||
    loadingState === LOADING_STATE.LOADING
  const isOptionsLoadingCompleted =
    (!isLoading && loadingState === LOADING_STATE.COMPLETED) || !loadingState

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (groupedOptions.length === 1) {
        const option = groupedOptions[0] as T
        const optionProps = getOptionProps({ option, index: 0 })

        // Simulate clicking the option
        optionProps.onClick?.(e as unknown as React.MouseEvent<HTMLLIElement>)
      }
    }
  }

  const highlightFirstOption = !isOptionsLoading && groupedOptions.length === 1

  return (
    <div
      className={classNames(
        'Concorde-Autocomplete',
        classes.root,
        hasInsufficientSpace && classes.verticalSpaceInsufficient,
        className
      )}
      onBlur={onBlur}
      ref={ref}
      style={style}
    >
      <div {...getRootProps()} ref={rootRef}>
        <AutoCompleteTriggerInput
          {...(getInputProps() as AutoCompleteTriggerProps)}
          {...triggerProps}
          clearIconProps={{
            ...getClearProps(),
            ...clearIconProps
          }}
          helperText={helperText}
          isClearable={!isNotClearable && Boolean(value || inputValue)}
          isDisabled={isDisabled}
          isError={isError}
          isFocused={focused}
          isFormattingEnabled={isFormattingEnabled}
          isLoading={isLoading}
          isNumberInput={isNumberInput}
          isOpen={popupOpen}
          isRequired={isRequired}
          label={label}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          readOnly={readOnly}
          triggerIconProps={{
            ...getPopupIndicatorProps(),
            ...triggerIconProps
          }}
        />

        {anchorEl && (
          <Popup
            anchor={anchorEl}
            className={classNames(
              'Concorde-Autocomplete__Popper',
              classes.popup
            )}
            disablePortal
            open={popupOpen}
          >
            <Menu
              {...getListboxProps()}
              {...menuRest}
              className={classNames(
                'Concorde-Autocomplete__Menu',
                classes.menuRoot,
                isMenuFullWidth && classes.menuFullWidth,
                (isOptionsLoading || !groupedOptions?.length) &&
                  classes.menuEmpty,
                menuClassName
              )}
              highlightFirstOption={highlightFirstOption}
            >
              {isOptionsLoading ? (
                <MenuItem className={classes.loader}>
                  <CircularProgress
                    color="currentColor"
                    size={20}
                    speed="0.5s"
                    thickness={1.5}
                  />
                </MenuItem>
              ) : (
                <>
                  {(groupedOptions as T[]).map((option, index) => {
                    const optionProps = getOptionProps({ option, index })
                    const isSelected = getOptionSelected
                      ? getOptionSelected(option, value)
                      : getOptionSelectedDefault(option, value)
                    const isDisabled = optionProps['aria-disabled'] === true
                    const optionLabel = getOptionLabel
                      ? getOptionLabel(option)
                      : option
                    const optionIcon = optionIcons?.[index]
                    const isAnyIconVisible = optionIcons?.find((icon) => icon)

                    return (
                      <MenuItem
                        {...optionProps}
                        isDisabled={isDisabled}
                        isSelected={isSelected}
                        key={index}
                      >
                        {optionIcon ? (
                          <MenuItemAdornment isVisible>
                            <Icon {...optionIcon} />
                          </MenuItemAdornment>
                        ) : (
                          <>
                            {showCheckIcon ? (
                              <MenuItemAdornment>
                                <Icon name="check" />
                              </MenuItemAdornment>
                            ) : (
                              <>
                                {/* Dummy icon when any icon is visible */}
                                {isAnyIconVisible && (
                                  <MenuItemAdornment isVisible={false}>
                                    <Icon name="square_dot" />
                                  </MenuItemAdornment>
                                )}
                              </>
                            )}
                          </>
                        )}
                        <MenuItemContent>
                          {renderOptionLabel
                            ? renderOptionLabel(option)
                            : optionLabel}
                        </MenuItemContent>
                      </MenuItem>
                    )
                  })}
                </>
              )}
              {isOptionsLoadingCompleted &&
                groupedOptions.length === 0 &&
                !freeSolo &&
                noOptionsText && (
                  <MenuItem>
                    <MenuItemContent>{noOptionsText}</MenuItemContent>
                  </MenuItem>
                )}
            </Menu>
          </Popup>
        )}
      </div>
    </div>
  )
}) as <
  T,
  isM extends boolean | undefined,
  isNC extends boolean | undefined,
  isFS extends boolean | undefined
>(
  props: AutocompleteProps<T, isM, isNC, isFS> & {
    ref?: ForwardedRef<HTMLDivElement>
  }
) => JSX.Element
