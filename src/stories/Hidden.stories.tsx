import type { Meta, StoryObj } from '@storybook/react'
import { useEffect, useState } from 'react'

import { Hidden } from '..'
import type { HiddenProps } from '../components/Hidden/types'

const meta: Meta<HiddenProps> = {
  title: 'Elements/Hidden',
  component: Hidden,
  parameters: {
    layout: 'centered'
  },
  args: {
    enabled: false
  },
  argTypes: {
    enabled: {
      control: 'boolean',
      description: 'Sets the visibility of the element.'
    }
  },
  render: Object.assign(
    ({ enabled, ...args }: HiddenProps) => {
      const [isEnabled, setIsEnabled] = useState(enabled)

      useEffect(() => {
        setIsEnabled(enabled)
      }, [enabled])

      return (
        <Hidden {...args} enabled={isEnabled}>
          <div>Hide me!</div>
        </Hidden>
      )
    },
    {
      displayName: 'Hidden'
    }
  )
}

export default meta

type Story = StoryObj<HiddenProps>

export const Default: Story = {
  args: {
    enabled: false
  }
}

export const Enabled: Story = {
  args: {
    enabled: true
  }
}

export const Disabled: Story = {
  args: {
    enabled: false
  }
}
