import classNames from 'classnames'

import { TabButton } from './TabButton'
import classes from './TabButtonGroup.module.scss'
import type { TabButtonGroupProps } from './types'

export const TabButtonGroup = <TabId extends string>({
  tabs,
  activeTabId,
  onTabChange,
  className,
  ...props
}: TabButtonGroupProps<TabId>) => (
  <div className={classNames(classes.tabButtonGroup, className)} {...props}>
    {tabs.map(({ id, label, icon }) => (
      <TabButton
        active={id === activeTabId}
        icon={icon}
        key={id}
        label={label}
        onClick={() => onTabChange?.(id)}
      />
    ))}
  </div>
)
