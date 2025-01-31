import type { Meta, StoryObj } from '@storybook/react'

import type { IconProps } from '..'
import { Icon } from '..'

const meta: Meta<IconProps> = {
  title: 'Elements/Icon',
  component: Icon,
  parameters: {
    layout: 'centered'
  },
  args: {
    variant: 'rounded',
    isFilled: false
  },
  argTypes: {
    name: {
      control: 'text',
      description:
        'Search for more icon names here: https://marella.me/material-symbols/demo/'
    },
    isFilled: { control: 'boolean', description: 'sets the icon to filled.' },
    variant: {
      control: 'select',
      options: ['sharp', 'rounded'],
      description: 'variant of the icon.\n\nDefaults to `rounded`'
    },
    color: { control: 'color', description: 'color of the icon.' },
    hoverColor: { control: 'color', description: 'hover color of the icon.' }
  }
}

export default meta

type Story = StoryObj<IconProps>

export const Add: Story = {
  args: {
    name: 'add'
  }
}

export const Repeat: Story = {
  args: {
    name: 'repeat',
    color: '#67d3fe'
  }
}

export const Remove: Story = {
  args: {
    name: 'remove',
    color: '#37c39e'
  }
}

export const Checkbook: Story = {
  args: {
    name: 'checkbook'
  }
}

export const FilledIcon: Story = {
  args: {
    name: 'sell',
    isFilled: true
  }
}
