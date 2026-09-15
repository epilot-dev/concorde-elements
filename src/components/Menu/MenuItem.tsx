import classNames from 'classnames'
import type { KeyboardEvent, ReactElement } from 'react'
import {
  cloneElement,
  forwardRef,
  isValidElement,
  useImperativeHandle,
  useRef
} from 'react'
import flattenChildren from 'react-keyed-flatten-children'

import classes from './MenuItem.module.scss'
import type {
  MenuItemAdornmentProps,
  MenuItemContentProps,
  MenuItemCSSProperties,
  MenuItemProps
} from './types'

export const MenuItem = forwardRef<HTMLLIElement, MenuItemProps>(
  (props, ref) => {
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
      isHighlighted,
      children,
      ...rest
    } = props

    // Create a local ref
    const localRef = useRef<HTMLLIElement>(null)

    // Expose the local ref via the forwarded ref
    useImperativeHandle(ref, () => localRef.current as HTMLLIElement)

    const customColors: MenuItemCSSProperties = {
      '--concorde-menu-item-hover-color': hoverColor,
      '--concorde-menu-item-hover-bg-color': hoverBgColor,
      '--concorde-menu-item-selected-color': selectedColor,
      '--concorde-menu-item-selected-bg-color': selectedBgColor
    }

    const customStyles = {
      ...style,
      ...customColors
    }

    const directChildren = flattenChildren(children).map((child) => {
      // If it's a MenuAdornment, pass some props to it
      if (isValidElement(child) && child.type === MenuItemAdornment) {
        return cloneElement(child as ReactElement<MenuItemAdornmentProps>, {
          isSelected
        })
      }

      return child
    })

    const onKeyDown = (e: KeyboardEvent<HTMLLIElement>) => {
      if (isDisabled) return

      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        localRef.current?.click()
      }
    }

    if (onClick) {
      return (
        <li
          aria-disabled={isDisabled}
          aria-selected={isSelected}
          className={classNames(
            'Concorde-MenuItem',
            classes.root,
            classes['menu-item-clickable'],
            isDisabled && classes['menu-item-disabled'],
            isSelected && classes['menu-item-selected'],
            isHighlighted && classes['menu-item-selected'],
            className
          )}
          onClick={!isDisabled ? onClick : undefined}
          onKeyDown={onKeyDown}
          role="option"
          style={customStyles}
          tabIndex={0}
          {...rest}
          ref={localRef}
        >
          {directChildren}
        </li>
      )
    }

    return (
      <li
        aria-selected={isSelected}
        className={classNames(
          'Concorde-MenuItem',
          classes.root,
          isDisabled && classes['menu-item-disabled'],
          isClickable && classes['menu-item-clickable'],
          isSelected && classes['menu-item-selected'],
          isHighlighted && classes['menu-item-selected'],
          className
        )}
        onKeyDown={isClickable ? onKeyDown : undefined}
        role="option"
        style={customStyles}
        tabIndex={isClickable || isSelected ? 0 : undefined}
        {...rest}
        ref={localRef}
      >
        {directChildren}
      </li>
    )
  }
)

export const MenuItemContent = forwardRef<HTMLDivElement, MenuItemContentProps>(
  (props, ref) => {
    const { className, ...rest } = props

    return (
      <div
        className={classNames(
          'Concorde-MenuItem__Content',
          classes['menu-item-content'],
          className
        )}
        ref={ref}
        {...rest}
      />
    )
  }
)

export const MenuItemAdornment = forwardRef<
  HTMLDivElement,
  MenuItemAdornmentProps
>((props, ref) => {
  const { className, isSelected, isVisible, ...rest } = props

  const isAdornmentVisible =
    isVisible === true || (isVisible === undefined && isSelected)

  return (
    <div
      className={classNames(
        'Concorde-MenuItem__Adornment',
        classes['menu-item-adornment'],
        isAdornmentVisible && classes['menu-item-adornment-visible'],
        className
      )}
      ref={ref}
      {...rest}
    />
  )
})

MenuItem.displayName = 'MenuItem'
MenuItemAdornment.displayName = 'MenuItemAdornment'
MenuItemContent.displayName = 'MenuItemContent'
