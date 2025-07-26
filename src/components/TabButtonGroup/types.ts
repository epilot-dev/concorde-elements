import type { ComponentProps, CSSProperties } from 'react'

import type { IconName } from '../Icon'

export type TabButtonCssProperties = CSSProperties & {
  '--concorde-tab-button-color'?: string
  '--concorde-tab-button-hover-bg-color'?: string
  '--concorde-tab-button-selected-bg-color'?: string
}

export type TabButtonProps = ComponentProps<'button'> & {
  label: string
  icon?: IconName
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
