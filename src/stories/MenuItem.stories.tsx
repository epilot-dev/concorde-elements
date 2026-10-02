import type { Meta, StoryObj } from '@storybook/react'

import type { MenuItemCSSProperties, MenuItemProps } from '..'
import { MenuItem, MenuItemAdornment, MenuItemContent, Icon } from '..'

import { CustomTokensWrapper } from './components'

const menuItem = 'February'

const meta: Meta<MenuItemProps> = {
  title: 'Elements/Menu/MenuItem',
  component: MenuItem,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    children: { control: false },
    isSelected: {
      control: 'boolean',
      description: 'Turn on selected styles on the list item option.'
    },
    isDisabled: {
      control: 'boolean',
      description: 'Turn on disabled styles on the menu item.'
    },
    hoverColor: {
      control: 'color',
      description:
        'Sets the color of the menu item on hover, when it is clickable'
    },
    hoverBgColor: {
      control: 'color',
      description:
        'Sets the background color of the menu items on hover, when it is clickable'
    },
    selectedColor: {
      control: 'color',
      description:
        'Sets the color of the menu items, when it is selected.\n\nDefaults to `hoverColor` if set'
    },
    selectedBgColor: {
      control: 'color',
      description:
        'Sets the background color of the menu items, when it is selected..\n\nDefaults to `hoverBgColor` if set'
    }
  }
}

export default meta

type Story = StoryObj<MenuItemProps>

export const Default: Story = {
  args: {
    isSelected: false,
    children: (
      <>
        <MenuItemContent>{menuItem}</MenuItemContent>
      </>
    )
  }
}

export const Selected: Story = {
  args: {
    isSelected: true,
    children: (
      <>
        <MenuItemAdornment>
          <Icon name="check" />
        </MenuItemAdornment>
        <MenuItemContent>{menuItem}</MenuItemContent>
        <MenuItemAdornment>
          <Icon name="close" />
        </MenuItemAdornment>
      </>
    )
  }
}

const CUSTOM_TOKENS: MenuItemCSSProperties = {
  '--concorde-menu-item-hover-color': 'string',
  '--concorde-menu-item-hover-bg-color': 'string',
  '--concorde-menu-item-selected-color': 'string',
  '--concorde-menu-item-selected-bg-color': 'string'
}

export const CustomTokens = () => {
  return (
    <CustomTokensWrapper
      customTokens={CUSTOM_TOKENS as Record<string, string>}
    />
  )
}
