import type { ComponentProps, CSSProperties } from 'react'

import type { IconName } from '../Icon'

export type TabButtonCssProperties = CSSProperties & {
  '--concorde-tab-button-color-components'?: string
  '--concorde-tab-button-text-color'?: string
}

export type TabButtonTab<TabId extends string = string> = {
  id: TabId
  label: string
  icon?: IconName
}

export type TabButtonProps = ComponentProps<'button'> & {
  label: string
  icon?: IconName
  active: boolean
}

export type TabButtonGroupProps<TabId extends string> =
  ComponentProps<'div'> & {
    tabs: Array<TabButtonTab<TabId>>
    activeTabId?: TabId
    onTabChange?: (activeTab: TabId) => void
  }
