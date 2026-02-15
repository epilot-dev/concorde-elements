import type { Meta, StoryObj } from '@storybook/react'

import type { TooltipProps } from '..'
import { Tooltip, Typography } from '..'

const meta: Meta<TooltipProps> = {
  title: 'Elements/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered'
  },
  args: {
    children: <Typography>Hover me</Typography>,
    arrow: true,
    title: 'This is a tooltip',
    isLocal: false
  },
  argTypes: {
    children: { control: false },
    title: { control: 'text', description: 'The title of the tooltip' },
    placement: {
      control: {
        type: 'radio',
        options: ['top', 'right', 'bottom', 'left']
      }
    },
    arrow: { control: 'boolean', description: 'Whether to show the arrow' }
  }
}

export default meta

type Story = StoryObj<TooltipProps>

export const Default: Story = {
  args: {}
}

export const TopPlaced: Story = {
  args: {
    ...Default.args,
    placement: 'top'
  }
}

export const NoArrow: Story = {
  args: {
    ...Default.args,
    arrow: false
  }
}
