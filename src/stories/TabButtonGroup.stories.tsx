import type { Meta, StoryObj } from '@storybook/react'

import type { TabButtonCssProperties, TabButtonGroupProps } from '..'
import { TabButtonGroup } from '..'

import { CustomTokensWrapper } from './components'

const meta: Meta<TabButtonGroupProps<string>> = {
  title: 'Elements/TabButtonGroup',
  component: TabButtonGroup,
  parameters: {
    layout: 'centered'
  },
  args: {
    tabs: [
      { id: 'tab1', label: 'Electric', icon: 'bolt' },
      { id: 'tab2', label: 'Gas', icon: 'gas_meter' },
      { id: 'tab3', label: 'House', icon: 'house' }
    ],
    activeTabId: 'tab1'
  },
  argTypes: {
    tabs: {
      control: 'object',
      description: 'Array of tab objects with id, label, and icon'
    },
    activeTabId: {
      control: 'text',
      description: 'ID of the currently active tab'
    },
    onTabChange: {
      action: 'onTabChange',
      description: 'Callback function when the active tab changes'
    }
  }
}

export default meta

type Story = StoryObj<TabButtonGroupProps<string>>

export const Default: Story = {}

const CUSTOM_TOKENS: TabButtonCssProperties = {
  '--concorde-tab-button-color': 'string',
  '--concorde-tab-button-hover-bg-color': 'string',
  '--concorde-tab-button-selected-bg-color': 'string'
}

export const CustomTokens = () => {
  return (
    <CustomTokensWrapper
      customTokens={CUSTOM_TOKENS as Record<string, string>}
    />
  )
}
