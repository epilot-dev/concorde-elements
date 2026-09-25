import type { Meta, StoryObj } from '@storybook/react'

import type { IconButtonProps } from '..'
import {
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemAdornment,
  ListItemContent
} from '..'

import { Container } from './components'

const meta: Meta<IconButtonProps> = {
  title: 'Elements/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    name: {
      control: 'text',
      description:
        'Search for more icon names here: https://marella.me/material-symbols/demo/'
    },
    color: { control: 'color', description: 'color of the icon.' },
    hoverColor: { control: 'color', description: 'hover color of the icon.' },
    variant: {
      control: 'select',
      options: ['sharp', 'rounded'],
      description: 'variant of the icon.\n\nDefaults to `rounded`'
    },
    'aria-label': {
      control: 'text',
      description: 'Accessible name of the button.'
    },
    isFilled: { control: 'boolean', description: 'sets the icon to filled.' }
  }
}

export default meta

type Story = StoryObj<IconButtonProps>

export const AddButton: Story = {
  args: {
    name: 'add',
    'aria-label': 'Add'
  }
}

export const RepeatButton: Story = {
  args: {
    name: 'repeat',
    color: '#67d3fe',
    'aria-label': 'Repeat'
  }
}

export const RemoveButton: Story = {
  args: {
    name: 'remove',
    color: '#37c39e',
    'aria-label': 'Remove'
  }
}

export const FilledIconButton: Story = {
  args: {
    name: 'sell',
    isFilled: true,
    'aria-label': 'sell'
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
            {`Avoid using the button without an 'aria-label', as screen readers need this for context.`}
          </ListItemContent>
        </ListItem>
      </List>
    </Container>
  )
}

export const CustomTokens = () => {
  return (
    <Container>
      <List>
        <ListItem>
          <ListItemContent>
            {`Refer to Icon & Button Custom Tokens for more information.`}
          </ListItemContent>
        </ListItem>
      </List>
    </Container>
  )
}
