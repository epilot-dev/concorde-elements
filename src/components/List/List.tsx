import classNames from 'classnames'
import type { ForwardedRef, KeyboardEvent } from 'react'
import { forwardRef } from 'react'

import classes from './List.module.scss'
import type {
  ListProps,
  ListItemProps,
  ListItemContentProps,
  ListTags,
  ListItemAdornmentProps,
  ListItemCSSProperties
} from './types'

export const List = forwardRef(
  <T extends ListTags>(
    props: ListProps<T>,
    ref: ForwardedRef<HTMLUListElement & HTMLOListElement>
  ) => {
    const { as = 'ul', className, ...rest } = props

    const Component = as

    return (
      <Component
        className={classNames('Concorde-List', classes['list'], className)}
        ref={ref}
        {...rest}
      />
    )
  }
)

export const ListItem = forwardRef<HTMLLIElement, ListItemProps>(
  (props: ListItemProps, ref) => {
    const {
      onClick,
      className,
      isClickable,
      isSelected,
      isDisabled,
      style,
      hoverColor,
      hoverBgColor,
      selectedColor,
      selectedBgColor,
      ...rest
    } = props

    const customColors: ListItemCSSProperties = {
      '--concorde-list-item-hover-color': hoverColor,
      '--concorde-list-item-hover-background-color': hoverBgColor,
      '--concorde-list-item-selected-color': selectedColor,
      '--concorde-list-item-selected-background-color': selectedBgColor
    }

    const customStyles = {
      ...style,
      ...customColors
    }

    function handleKeyDown(event: KeyboardEvent<HTMLLIElement>) {
      if (isDisabled) return
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        const element = event.target as HTMLElement

        element.click()
      }
    }

    if (onClick) {
      return (
        <li
          aria-disabled={isDisabled}
          aria-selected={isSelected}
          className={classNames(
            'Concorde-ListItem',
            classes['list-item'],
            classes['list-item-clickable'],
            isDisabled && classes['list-item-disabled'],
            isSelected && classes['list-item-selected'],
            className
          )}
          onClick={!isDisabled ? onClick : undefined}
          onKeyDown={handleKeyDown}
          role="option"
          style={customStyles}
          tabIndex={0}
          {...rest}
          ref={ref}
        />
      )
    }

    return (
      <li
        className={classNames(
          'Concorde-ListItem',
          classes['list-item'],
          isClickable && classes['list-item-clickable'],
          isSelected && classes['list-item-selected'],
          className
        )}
        style={customStyles}
        {...rest}
        ref={ref}
      />
    )
  }
)

export const ListItemContent = (props: ListItemContentProps) => {
  const { className, ...rest } = props

  return (
    <div
      className={classNames(
        'Concorde-ListItem__Content',
        classes['list-item-content'],
        className
      )}
      {...rest}
    />
  )
}

export const ListItemAdornment = (props: ListItemAdornmentProps) => {
  const { className, ...rest } = props

  return (
    <div
      className={classNames(
        'Concorde-ListItem__Adornment',
        classes['list-item-adornment'],
        className
      )}
      {...rest}
    />
  )
}

List.displayName = 'List'
ListItem.displayName = 'ListItem'
