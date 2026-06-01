import type {
  AutocompleteFreeSoloValueMapping,
  UseAutocompleteProps
} from '@mui/base'
import type {
  CSSProperties,
  FocusEvent,
  HTMLAttributes,
  ReactNode
} from 'react'

import type { IconButtonProps, IconProps, InputProps, MenuProps } from '..'

export type AutocompleteValue<T, isMulti, isNotClearable, isFreeSolo> =
  isMulti extends true
    ? Array<T | AutocompleteFreeSoloValueMapping<isFreeSolo>>
    : isNotClearable extends true
      ? NonNullable<T | AutocompleteFreeSoloValueMapping<isFreeSolo>>
      : T | null | AutocompleteFreeSoloValueMapping<isFreeSolo>

type AutocompleteButtonProps = Partial<IconButtonProps> &
  Omit<HTMLAttributes<HTMLButtonElement>, 'color' | 'name'>

export enum LOADING_STATE {
  PENDING = 'pending',
  LOADING = 'loading',
  COMPLETED = 'completed'
}

export type AutoCompleteTriggerProps = InputProps & {
  /**
   * Sets whether the clear icon is displayed.
   */
  isClearable?: boolean

  /*
   * Whether the trigger input is focused or not
   */
  isFocused?: boolean

  /*
   * Whether the autocomplete menu is open or not
   */
  isOpen?: boolean

  /**
   * Whether the Menu is loading or not
   */
  isLoading?: boolean

  /**
   * Props to pass to the clear icon
   */
  clearIconProps?: AutocompleteButtonProps

  /**
   * Props to pass to the trigger icon
   */
  triggerIconProps?: AutocompleteButtonProps

  /**
   * Changes the input to a number input
   */
  isNumberInput?: boolean

  /**
   * Formats the number input automatically
   */
  isFormattingEnabled?: boolean
}

export type AutocompleteProps<
  T,
  isMulti extends boolean | undefined,
  isNotClearable extends boolean | undefined,
  isFreeSolo extends boolean | undefined
> = UseAutocompleteProps<T, isMulti, isNotClearable, isFreeSolo> & {
  /*
   * Custom class of autocomplete
   */
  className?: string

  /*
   * Custom style of autocomplete
   */
  style?: CSSProperties

  /**
   * The label of the trigger input
   */
  label?: string

  /**
   * The placeholder of the trigger input
   */
  placeholder?: string

  /**
   * The helper text displayed below the trigger input
   */
  helperText?: ReactNode

  /**
   * Turns on the disabled state for the trigger input
   */
  isDisabled?: boolean

  /**
   * Turns on the error state for the trigger input
   */
  isError?: boolean

  /**
   * Turns on the required state for the trigger input
   */
  isRequired?: boolean

  /**
   * Sets whether the autocomplete is not clearable.
   *
   * Defaults to `false`
   */
  isNotClearable?: isNotClearable

  /**
   * Sets whether the Menu is multi-select or not
   */
  isMulti?: isMulti

  /**
   * Sets whether the Menu is loading or not. Helps to display the `noOptionsText` when loading is complete
   */
  isLoading?: boolean

  /**
   * Forces the autocomplete to be the same width as the trigger input width
   *
   * Defaults to `true`
   */
  isMenuFullWidth?: boolean

  /**
   * Props to pass to the clear icon
   */
  clearIconProps?: AutocompleteButtonProps

  /**
   * Props to pass to the trigger icon
   */
  triggerIconProps?: AutocompleteButtonProps

  /**
   * Props to pass to the trigger input
   */
  triggerProps?: AutoCompleteTriggerProps

  /**
   * Props to pass to the menu
   */
  menuProps?: MenuProps

  /**
   * Compute selected status of option. This is run on all options
   */
  getOptionSelected?: (
    option: T,
    value?: AutocompleteValue<T, isMulti, isNotClearable, isFreeSolo>
  ) => boolean

  /**
   * Callback fired when the autocomplete loses focus.
   */
  onBlur?: (event: FocusEvent<HTMLDivElement>) => void

  /**
   * The loading state of the autocomplete
   */
  loadingState?: LOADING_STATE

  /**
   * The text to be used if there are no options.
   */
  noOptionsText?: string | ReactNode

  /**
   * Show icon on selected options
   */
  showCheckIcon?: boolean

  /**
   * The icons to be used in the option labels
   */
  optionIcons?: IconProps[]

  /**
   * Override the default rendering of the option label
   */
  renderOptionLabel?: (option: T) => ReactNode

  /**
   * Changes the input to a number input
   */
  isNumberInput?: boolean

  /**
   * Formats the number input automatically
   */
  isFormattingEnabled?: boolean
}
