import type { Meta, StoryObj } from '@storybook/react'
import { useEffect, useState } from 'react'

import { Hidden } from '..'
import type { HiddenProps } from '..'

const meta: Meta<HiddenProps> = {
  title: 'Elements/Hidden',
  component: Hidden,
  parameters: {
    layout: 'centered'
  },
  args: {
    showChildren: false
  },
  argTypes: {
    showChildren: {
      control: 'boolean',
      description: 'Sets the visibility of the element.'
    }
  },
  render: Object.assign(
    ({ showChildren, ...args }: HiddenProps) => {
      const [isEnabled, setIsEnabled] = useState(showChildren)

      useEffect(() => {
        setIsEnabled(showChildren)
      }, [showChildren])

      return (
        <Hidden {...args} showChildren={isEnabled}>
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
    showChildren: false
  }
}

export const Enabled: Story = {
  args: {
    showChildren: true
  }
}

export const Disabled: Story = {
  args: {
    showChildren: false
  }
}
