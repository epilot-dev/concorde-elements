import type { Meta, StoryObj } from '@storybook/react'
import { Fragment } from 'react'

import type { MenuCSSProperties } from '..'
import {
  Menu,
  MenuItem,
  MenuItemAdornment,
  MenuItemContent,
  Icon,
  List,
  ListItem,
  ListItemAdornment,
  ListItemContent
} from '..'

import { Container, CustomTokensWrapper } from './components'

const menuItems = ['January', 'February', 'March', 'April', 'May']
const selectedMenuItem = 'February'

const menuBody = menuItems.map((item, index) => {
  const isSelected = item === selectedMenuItem

  return (
    <MenuItem
      isSelected={isSelected}
      key={index}
      // eslint-disable-next-line no-console
      onClick={() => console.log('Clicked')}
    >
      <MenuItemAdornment isSelected={isSelected}>
        <Icon name="check" />
      </MenuItemAdornment>
      <MenuItemContent>{item}</MenuItemContent>
    </MenuItem>
  )
})

const meta: Meta<typeof Menu> = {
  title: 'Elements/Menu/Menu',
  component: Menu,
  parameters: {
    layout: 'centered'
  },
  args: {
    'aria-label': 'Menu'
  },
  argTypes: {
    children: { control: false },
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

type Story = StoryObj<typeof Menu>

export const Default: Story = {
  args: {
    children: <>{menuBody}</>
  }
}

export const Colored: Story = {
  args: {
    children: <>{menuBody}</>,
    hoverColor: '#a0f6cc',
    hoverBgColor: '#100f11',
    selectedColor: '#f4f4f4',
    selectedBgColor: '#5447ec'
  }
}

export const Accessibility = () => {
  return (
    <Container>
      <List>
        <ListItem>
          <ListItemAdornment>
            <Icon name="check_circle" />
          </ListItemAdornment>
          <ListItemContent>
            {`Avoid using the Menu without an 'aria-label', as screen readers need this for the menu title.`}
          </ListItemContent>
        </ListItem>
      </List>
    </Container>
  )
}

const CUSTOM_TOKENS: MenuCSSProperties = {
  '--concorde-menu-bg-color': 'string'
}

export const CustomTokens = () => {
  return (
    <CustomTokensWrapper
      customTokens={CUSTOM_TOKENS as Record<string, string>}
    />
  )
}
