import type { Meta, StoryObj } from '@storybook/react'
import React, { useEffect, useState } from 'react'

import type { LinearProgressProps } from '..'
import { LinearProgress } from '..'

const meta: Meta<LinearProgressProps> = {
  title: 'Elements/LinearProgress',
  component: LinearProgress,
  parameters: {
    layout: 'centered'
  },
  args: {
    value: 13
  },
  argTypes: {
    value: { control: 'number', description: 'The value of the progress' },
    height: {
      control: 'number',
      description: 'The height of the progress bar',
      defaultValue: 4
    },
    max: {
      control: 'number',
      description: 'The maximum value of the progress',
      defaultValue: 100
    }
  },
  render: Object.assign(
    ({ value, ...args }: LinearProgressProps) => {
      const [progress, setProgress] = useState(0)

      useEffect(() => {
        if (!value) return
        const timer = setTimeout(() => setProgress(value), 500)

        return () => clearTimeout(timer)
      }, [value])

      return (
        <LinearProgress {...args} style={{ minWidth: 250 }} value={progress} />
      )
    },
    {
      displayName: 'LinearProgress'
    }
  )
}

export default meta

type Story = StoryObj<LinearProgressProps>

export const Default: Story = {
  args: {}
}

export const Full: Story = {
  args: {
    ...Default.args,
    value: 100
  }
}

export const Empty: Story = {
  args: {
    ...Default.args,
    value: 0
  }
}

export const Height: Story = {
  args: {
    ...Default.args,
    value: 40,
    height: 20
  }
}
