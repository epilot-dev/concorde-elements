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
  <div
    className={classNames(
      'Concorde-TabButtonGroup',
      classes.tabButtonGroup,
      className
    )}
    role="tablist"
    {...props}
  >
    {tabs.map(({ id, label, icon, ...props }) => (
      <TabButton
        active={id === activeTabId}
        icon={icon}
        key={id}
        label={label}
        /**
         * @todo We shouldn't be passing the props to both the button and the tablist
         */
        {...props}
        onClick={() => onTabChange?.(id)}
      />
    ))}
  </div>
)
