import type { Meta, StoryObj } from '@storybook/react'

import type { DividerCSSProperties, DividerProps } from '..'
import { Divider } from '..'

import { CustomTokensWrapper } from './components'

const meta: Meta<DividerProps> = {
  title: 'Elements/Divider',
  component: Divider,
  parameters: {
    layout: 'centered'
  },
  args: {
    orientation: 'horizontal',
    thickness: 1,
    style: {
      minWidth: '150px',
      minHeight: '150px'
    },
    color: '#c1c4f0'
  },
  argTypes: {
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'Sets the orientation of the divider.'
    },
    thickness: {
      control: 'number',
      description: 'Sets the thickness of the divider.'
    },
    color: {
      control: 'color',
      description: 'Sets the color of the divider.'
    }
  }
}

export default meta

type Story = StoryObj<DividerProps>

export const Default: Story = {}

export const Vertical: Story = {
  args: {
    orientation: 'vertical'
  }
}

export const Colored: Story = {
  args: {
    color: 'red'
  }
}

export const Thickness: Story = {
  args: {
    thickness: 10
  }
}

const CUSTOM_TOKENS: DividerCSSProperties = {
  '--concorde-divider-custom-color': 'string',
  '--concorde-divider-thickness': 'string'
}

export const CustomTokens = () => {
  return (
    <CustomTokensWrapper
      customTokens={CUSTOM_TOKENS as Record<string, string>}
    />
  )
}
