import type { Meta, StoryObj } from '@storybook/react'

import type { ExpandIconProps } from '..'
import { ExpandIcon } from '..'

const meta: Meta<ExpandIconProps> = {
  title: 'Elements/ExpandIcon',
  component: ExpandIcon,
  parameters: {
    layout: 'centered'
  },
  args: {
    isExpanded: false
  },
  argTypes: {
    isExpanded: {
      control: 'boolean',
      description: 'Decides the icon rotation state.\n\nDefaults to `false`'
    }
  }
}

export default meta

type Story = StoryObj<ExpandIconProps>

export const Default: Story = {}
