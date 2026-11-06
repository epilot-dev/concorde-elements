import type {
  DropdownMenuProps as DropdownMenuRootBaseProps,
  DropdownMenuContentProps as DropdownMenuBaseProps,
  DropdownMenuItemProps as DropdownMenuItemPropsBase,
  DropdownMenuSeparatorProps as DropdownMenuSeparatorBaseProps,
  DropdownMenuItemIndicatorProps,
  DropdownMenuTriggerProps as DropdownMenuTriggerBaseProps,
  DropdownMenuPortalProps
} from '@radix-ui/react-dropdown-menu'
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react'

import type {
  DividerProps,
  InputProps,
  MenuItemAdornmentProps,
  MenuItemContentProps,
  MenuItemProps,
  MenuProps
} from '..'

export type DropdownValue = string

export type DropdownOption = {
  label: string
  value: DropdownValue
}

export type DropdownMenuProps = MenuProps &
  DropdownMenuBaseProps & {
    /**
     * The id of the Menu label (for accessibility). Sets aria-labelledby
     */
    labelId?: string
  }

export type DropdownMenuXPropsBase = Omit<
  DropdownMenuProps,
  'defaultValue' | 'onSelect'
> & {
  /**
   * The id of the Menu element
   */
  id?: string

  /**
   * The options of the Menu
   */
  options: DropdownOption[]

  /**
   * The list of disabled option labels of the Menu
   */
  disabledLabels?: string[]

  /**
   * The select handler of the Menu items
   */
  onSelect?: (value: DropdownValue) => void

  /**
   * Sets the multi-select display value separator
   *
   * Defaults to `, `
   */
  separator?: string
}

export type DropdownMenuSingleXProps = DropdownMenuXPropsBase & {
  /**
   * The single selected value of the Menu
   */
  value?: DropdownValue

  /**
   * The default single selected value of the Menu
   */
  defaultValue?: DropdownValue
}

export type DropdownMenuMultiXProps = DropdownMenuXPropsBase & {
  /**
   * The multi selected value of the Menu
   */
  value?: DropdownValue[]
  /**
   * The default multi selected value of the Menu
   */
  defaultValue?: DropdownValue[]
}

export type DropdownMenuXProps =
  | DropdownMenuSingleXProps
  | DropdownMenuMultiXProps

export type DropdownMenuItemProps = MenuItemProps &
  DropdownMenuItemPropsBase & {
    /**
     * The highlighted state of the trigger.
     */
    'data-highlighted'?: boolean

    /**
     * The disabled state of the trigger.
     */
    'data-disabled'?: boolean
  }

export type DropdownMenuItemAdornmentProps = MenuItemAdornmentProps &
  DropdownMenuItemIndicatorProps

export type DropdownMenuItemContentProps = MenuItemContentProps

export type DropdownMenuSeparatorProps = DividerProps &
  DropdownMenuSeparatorBaseProps

export type DropdownMenuTriggerProps = DropdownMenuTriggerBaseProps &
  InputProps & {
    /**
     * The selected state of the trigger.
     */
    'data-state'?: 'open' | 'closed'

    /**
     * The disabled state of the trigger.
     */
    'data-disabled'?: string

    /**
     * Handler for clearing the selected value. Works with `isClearable`
     */
    onClear?: () => void

    /**
     * Sets whether the clear icon is displayed. Works with `onClear`
     */
    isClearable?: boolean

    /**
     * The icon that is displayed when the dropdown is clearable. Works with `isClearable` and `onClear`
     *
     * Defaults to `<Icon name="close" />` component
     */
    clearIcon?: ReactNode

    /**
     * The width of the dropdown menu
     */
    dropdownWidth?: string
  }

export type DropdownMenuRootProps = DropdownMenuRootBaseProps & {
  /**
   * Sets the props of the root's container element.
   */
  containerProps?: Omit<HTMLAttributes<HTMLDivElement>, 'className'>

  /**
   * Sets the className of the root's container element.
   */
  className?: string
}

export type DropdownXBaseProps = Pick<
  DropdownMenuRootProps,
  'defaultOpen' | 'onOpenChange' | 'open' | 'children' | 'containerProps'
> & {
  /**
   * The value displayed in the trigger input
   */
  displayValue?: string

  /**
   * The label of the trigger input
   */
  label?: DropdownMenuTriggerProps['label']

  /**
   * The id of the trigger input
   */
  inputId?: DropdownMenuTriggerProps['id']

  /**
   * Sets whether the Menu is multi-select or not
   */
  isMulti?: boolean

  /**
   * Turns on the disabled state for the trigger input
   */
  isDisabled?: DropdownMenuTriggerProps['isDisabled']

  /**
   * Turns on the error state for the trigger input
   */
  isError?: DropdownMenuTriggerProps['isError']

  /**
   * Turns on the required state for the trigger input
   */
  isRequired?: DropdownMenuTriggerProps['isRequired']

  /**
   * Determines whether the dropdown is clearable or not. Works with `onClear` prop
   */
  isClearable?: DropdownMenuTriggerProps['isClearable']

  /**
   * Handler for clearing the selected value. Works with `isClearable`
   */
  onClear?: DropdownMenuTriggerProps['onClear']

  /**
   * The helper text displayed below the trigger input
   */
  helperText?: DropdownMenuTriggerProps['helperText']

  /**
   * Forces the menu to be the same width as the trigger input width
   *
   * Defaults to `true`
   */
  isMenuFullWidth?: boolean

  /**
   * The end adornment of the trigger input. Accepts multiple icons in a Fragment also. Overrides `clearIcon` if set.
   *
   * If set, pass `onOpenChange` as a custom `onClick` handler to trigger opening the dropdown menu
   *
   * Defaults to `ExpandMore` component
   */
  triggerIcon?: DropdownMenuTriggerProps['endAdornment']

  /**
   * The icon that is displayed when the dropdown is clearable. Is displayed only when `isClearable` is true.
   *
   * If set, pass custom `onClick` handler as a prop to clear the dropdown menu selection. If `triggerIcon` is set, this is overridden
   *
   * Defaults to `<Icon name="close" />` component
   */
  clearIcon?: DropdownMenuTriggerProps['clearIcon']

  /**
   * Other props that are passed to the Dropdown trigger input
   */
  triggerProps?: Omit<
    DropdownMenuTriggerProps,
    'label' | 'endAdornment' | 'id' | 'isError' | 'isRequired' | 'helperText'
  >

  /**
   * Sets the alignment of the dropdown menu relative to the trigger element. Active only when `isMenuFullWidth` is set to `false`.
   */
  align?: Omit<DropdownMenuProps['align'], 'end'>

  /**
   * Dropdown portal props
   */
  portalProps?: DropdownMenuPortalProps

  /**
   * Makes the dropdown read-only, preventing user interaction while still displaying the selected value
   */
  readOnly?: boolean
}

type DropdownXSingleBaseProps = DropdownMenuSingleXProps & DropdownXBaseProps
type DropdownXMultiBaseProps = DropdownMenuMultiXProps & DropdownXBaseProps
export type DropdownXProps = DropdownXSingleBaseProps | DropdownXMultiBaseProps

export type DropdownXMultiProps = Omit<DropdownXMultiBaseProps, 'isMulti'>
export type DropdownXSingleProps = Omit<DropdownXSingleBaseProps, 'isMulti'>

export interface DropdownCSSProperties extends CSSProperties {
  '--concorde-dropdown-menu-width'?: string
}
