import type {
  CSSProperties,
  DetailedHTMLProps,
  HTMLAttributes,
  MouseEventHandler
} from 'react'

type NativeList = DetailedHTMLProps<
  HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
>

type NativeListItem = DetailedHTMLProps<
  HTMLAttributes<HTMLLIElement>,
  HTMLLIElement
>

export type NativeDiv = Omit<
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  'ref' | 'asChild' | 'defaultChecked' | 'defaultValue' | 'color'
>

export type MenuProps = Omit<
  NativeList,
  'ref' | 'asChild' | 'defaultChecked' | 'defaultValue' | 'color'
> & {
  /**
   * Sets the color of the menu items on hover, when it is clickable
   */
  hoverColor?: MenuItemProps['hoverColor']

  /**
   * Sets the background color of the menu items on hover, when it is clickable
   */
  hoverBgColor?: MenuItemProps['hoverBgColor']

  /**
   * Sets the color of the menu items, when it is selected.
   */
  selectedColor?: MenuItemProps['selectedColor']

  /**
   * Sets the background color of the menu items, when it is selected.
   */
  selectedBgColor?: MenuItemProps['selectedBgColor']

  /**
   * Whether the first option should be highlighted.
   */
  highlightFirstOption?: boolean
}

export type MenuItemProps = Omit<
  NativeListItem,
  'ref' | 'asChild' | 'defaultChecked' | 'defaultValue' | 'color'
> & {
  /**
   * Handler for click events on the menu item option and makes menu item clickable. Use `isClickable` alternatively to turn on clickable styles.
   */
  onClick?: MouseEventHandler<HTMLLIElement>

  /**
   * Turn on selected styles on the menu item option
   */
  isSelected?: boolean

  /**
   * Disables click events on the menu item option
   */
  isDisabled?: boolean

  /**
   * Turns on clickable styles if `onClick` is not set
   */
  isClickable?: boolean

  /**
   * Sets the color of the menu item on hover, when it is clickable
   */
  hoverColor?: string

  /**
   * Sets the background color of the menu item on hover, when it is clickable
   */
  hoverBgColor?: string

  /**
   * Sets the color of the menu item, when it is selected.
   */
  selectedColor?: string

  /**
   * Sets the background color of the menu item, when it is selected.
   */
  selectedBgColor?: string

  /**
   * Whether the menu item is highlighted.
   */
  isHighlighted?: boolean
}

export type MenuItemContentProps = NativeDiv

export type MenuItemAdornmentProps = NativeDiv & {
  /**
   * Determines whether the adornment is selected (visible) or not. Also passed down from `MenuItem`
   */
  isSelected?: boolean

  /**
   * Wheter the content of the adornment is visible or not. Overrides `isSelected` if set
   */
  isVisible?: boolean
}

export interface MenuCSSProperties extends CSSProperties {
  '--concorde-menu-bg-color'?: string
}

export interface MenuItemCSSProperties extends CSSProperties {
  '--concorde-menu-item-hover-color'?: string
  '--concorde-menu-item-hover-bg-color'?: string
  '--concorde-menu-item-selected-color'?: string
  '--concorde-menu-item-selected-bg-color'?: string
}
