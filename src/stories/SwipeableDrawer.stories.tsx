import type { Meta, StoryObj } from '@storybook/react'

import type { SwipeableDrawerProps } from '..'
import { SwipeableDrawer } from '..'

const meta: Meta<SwipeableDrawerProps> = {
  title: 'Elements/SwipeableDrawer',
  component: SwipeableDrawer,
  parameters: {
    layout: 'centered'
  },
  args: {
    collapsedString: 'Open the drawer',
    wrapChildrenWithDrawer: true,
    children: <h2>SwipeableDrawer content</h2>
  },
  argTypes: {
    collapsedString: {
      control: 'text',
      description: 'String to display when drawer is collapsed'
    },
    wrapChildrenWithDrawer: {
      control: 'boolean',
      description:
        'If true, the drawer will be visible, otherwise content will be displayed without a drawer'
    },
    children: {
      control: false
    }
  },
  render: Object.assign(
    (args: SwipeableDrawerProps) => {
      return <SwipeableDrawer {...args} />
    },
    {
      displayName: 'SwipeableDrawer'
    }
  )
}

export default meta

type Story = StoryObj<SwipeableDrawerProps>

export const Default: Story = {}
