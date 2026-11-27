import type { Meta, StoryObj } from '@storybook/react'

import type { CircularProgressCSSProperties, CircularProgressProps } from '../'
import { CircularProgress } from '../'

import { CustomTokensWrapper } from './components'

const meta: Meta<CircularProgressProps> = {
  title: 'Elements/Circular Progress',
  component: CircularProgress,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    color: {
      control: 'color'
    }
  }
}

export default meta

type Story = StoryObj

export const Default: Story = {
  args: {}
}

const CUSTOM_TOKENS: CircularProgressCSSProperties = {
  '--concorde-circular-progress-size': 'string',
  '--concorde-circular-progress-speed': 'string'
}

export const CustomTokens = () => {
  return (
    <CustomTokensWrapper
      customTokens={CUSTOM_TOKENS as Record<string, string>}
    />
  )
}
