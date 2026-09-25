import type { ComponentProps, CSSProperties } from 'react'

import type { IconName, IconProps } from '../Icon'

export type TabButtonCssProperties = CSSProperties & {
  '--concorde-tab-button-color'?: string
  '--concorde-tab-button-hover-bg-color'?: string
  '--concorde-tab-button-selected-bg-color'?: string
}

export type TabButtonProps = ComponentProps<'button'> & {
  label: string
  icon?: IconName
  /** Optional styling (variant, fill, size, color) for the tab icon. */
  iconProps?: Omit<IconProps, 'name'>
  active: boolean
}

export type TabButtonTab<TabId extends string = string> = Omit<
  TabButtonProps,
  'active'
> & {
  id: TabId
}

export type TabButtonGroupProps<TabId extends string> =
  ComponentProps<'div'> & {
    tabs: Array<TabButtonTab<TabId>>
    activeTabId?: TabId
    onTabChange?: (activeTab: TabId) => void
  }
