import type { Meta, StoryObj } from '@storybook/react'

import type { DottedLineCSSProperties, DottedLineProps } from '..'
import { DottedLine } from '..'

import { CustomTokensWrapper } from './components'

const meta: Meta<DottedLineProps> = {
  title: 'Elements/DottedLine',
  component: DottedLine,
  parameters: {
    layout: 'centered'
  },
  args: {
    color: '#ffa500'
  },
  argTypes: {
    color: {
      control: 'color',
      description: 'Sets the color of the dotted-line, otherwise inherits.'
    }
  },
  render: Object.assign(
    (args: DottedLineProps) => {
      return <DottedLine {...args} style={{ minWidth: 250 }} />
    },
    {
      displayName: 'DottedLine'
    }
  )
}

export default meta

type Story = StoryObj<DottedLineProps>

export const Default: Story = {}

const CUSTOM_TOKENS: DottedLineCSSProperties = {
  '--concorde-dotted-line-custom-color': 'string'
}

export const CustomTokens = () => {
  return (
    <CustomTokensWrapper
      customTokens={CUSTOM_TOKENS as Record<string, string>}
    />
  )
}
