import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { CircularProgress as CircularProgressComponent } from '../components'

const meta: Meta = {
  title: 'Elements/Circular Progress',
  component: CircularProgressComponent,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    children: { control: false },
    color: {
      control: 'color'
    }
  }
}

export default meta

type Story = StoryObj

export const CircularProgress: Story = {
  args: {
    children: <CircularProgressComponent />
  }
}
