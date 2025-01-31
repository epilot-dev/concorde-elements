import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import type { BadgeProps } from '..'
import {
  Badge,
  Icon,
  List,
  ListItem,
  ListItemAdornment,
  ListItemContent
} from '..'

import { Container } from './components'

const meta: Meta<BadgeProps> = {
  title: 'Elements/Badge',
  component: Badge,
  parameters: {
    layout: 'centered'
  },
  args: {
    children: <Icon isFilled name="shopping_cart" />,
    title: 'This is a Badge',
    badgeContent: '5',
    'aria-label': 'This is a Badge'
  },
  argTypes: {
    children: {
      control: false,
      description: 'The badge will be added relative to this element'
    },
    invisible: {
      control: 'boolean',
      description: 'Hides the badge when set to true.'
    },
    badgeContent: {
      control: 'text',
      description: 'The content of the badge.'
    },
    showZero: {
      control: 'boolean',
      description:
        'Shows the badge when the content is 0 because `badgeContent` does not show when it is 0.'
    },
    max: {
      control: 'number',
      description: 'The maximum value to display.'
    },
    variant: {
      control: 'radio',
      options: ['primary', 'secondary', 'error'],
      description: 'The variant of the badge.'
    },
    containerProps: {
      control: false,
      description: 'Props of the badge root element.'
    },
    badgeProps: {
      control: false,
      description: 'Props of the badge element.'
    }
  }
}

export default meta

type Story = StoryObj<BadgeProps>

export const Default: Story = {
  args: {}
}

export const Primary: Story = {
  args: {
    ...Default.args,
    variant: 'primary'
  }
}

export const Secondary: Story = {
  args: {
    ...Default.args,
    children: <Icon isFilled name="info" />,
    variant: 'secondary'
  }
}

export const Error: Story = {
  args: {
    ...Default.args,
    children: '😅',
    badgeContent: '!!',
    variant: 'error'
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
            {`Avoid using the Badge without an 'aria-label', to add a label for accessibility.`}
          </ListItemContent>
        </ListItem>
      </List>
    </Container>
  )
}
