import type { Meta, StoryObj } from '@storybook/react'

import type { ChipProps } from '..'
import { Chip } from '..'

const meta: Meta<ChipProps> = {
  title: 'Elements/Chip',
  component: Chip,
  parameters: {
    layout: 'centered'
  },
  args: {
    children: 'This is a Chip'
  },
  argTypes: {
    children: {
      control: false,
      description: 'The chip text'
    },
    className: {
      control: 'text',
      description: 'Class name of the chip.'
    },
    leftIcon: {
      control: 'text',
      description: 'Icon displayed on the left side of the chip.'
    },
    backgroundColor: {
      control: 'color',
      description: 'Background color of the chip.'
    },
    hoverBgColor: {
      control: 'color',
      description: 'Background color of the chip when hovered.'
    },
    onDelete: {
      control: false,
      description:
        'Callback function that is called when the checkbox state is changed.'
    }
  }
}

export default meta

type Story = StoryObj<ChipProps>

export const Default: Story = {
  args: {}
}

export const WithLeftIcon: Story = {
  args: {
    leftIcon: 'sell'
  }
}

export const WithDeleteButton: Story = {
  args: {
    onDelete: () => alert('delete')
  }
}
