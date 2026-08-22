import type {
  CSSProperties,
  DetailedHTMLProps,
  HTMLAttributes,
  MouseEventHandler
} from 'react'

type NativeListItem = DetailedHTMLProps<
  HTMLAttributes<HTMLLIElement>,
  HTMLLIElement
>

type NativeDiv = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>

export type ListTags = 'ul' | 'ol'

export interface ListTagProps<T extends ListTags> {
  /**
   * html element that component will be rendered as.
   * Defaults to the ul element
   */
  as?: T
}

export type ListProps<T extends ListTags> = Omit<
  ListTagProps<T> & JSX.IntrinsicElements[T],
  'ref'
>

export type ListItemProps = Omit<NativeListItem, 'ref'> & {
  /**
   * Handler for click events on the list item option and makes list item clickable. Use `isClickable` alternatively to turn on clickable styles.
   */
  onClick?: MouseEventHandler<HTMLLIElement>

  /**
   * Turn on selected styles on the list item option
   */
  isSelected?: boolean

  /**
   * Disables click events on the list item option
   */
  isDisabled?: boolean

  /**
   * Turns on clickable styles if `onClick` is not set
   */
  isClickable?: boolean

  /**
   * Sets the color of the list item on hover, when it is clickable
   */
  hoverColor?: string

  /**
   * Sets the background color of the list item on hover, when it is clickable
   */
  hoverBgColor?: string

  /**
   * Sets the color of the list item, when it is selected.
   */
  selectedColor?: string

  /**
   * Sets the background color of the list item, when it is selected.
   */
  selectedBgColor?: string
}

export type ListItemContentProps = Omit<NativeDiv, 'ref'>

export type ListItemAdornmentProps = Omit<NativeDiv, 'ref'>

export interface ListItemCSSProperties extends CSSProperties {
  '--concorde-list-item-hover-color'?: string
  '--concorde-list-item-hover-background-color'?: string
  '--concorde-list-item-selected-color'?: string
  '--concorde-list-item-selected-background-color'?: string
}
