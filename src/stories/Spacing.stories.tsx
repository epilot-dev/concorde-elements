import type { Meta, StoryObj } from '@storybook/react'

import type { SpacingCSSProperties, SpacingProps } from '..'
import { Button, Spacing } from '..'

import { CustomTokensWrapper } from './components'

function SpacingBody() {
  return (
    <>
      <Button label="Test 1" variant="primary" />
      <Button label="Test 2" variant="ghost" />
      <Button label="Test 3" variant="disabled" />
    </>
  )
}

const meta: Meta<SpacingProps> = {
  title: 'Elements/Spacing',
  component: Spacing,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    children: { control: false },
    variant: {
      control: 'select',
      options: ['inline', 'inset', 'stack'],
      description: 'Variant of spacing element.'
    },
    alignItems: {
      control: 'select',
      options: ['stretch', 'flex-start', 'center', 'flex-end', 'baseline'],
      description:
        'Set the alignment of all the children as a group.\n\nDefaults to flex-start.'
    },
    scale: {
      control: 'number',
      description: 'Spacing scale to be applied.\n\nDefaults to 1'
    }
  }
}

export default meta

type Story = StoryObj<SpacingProps>

export const Inline: Story = {
  args: {
    variant: 'inline',
    children: <SpacingBody />,
    alignItems: 'flex-start',
    scale: 4
  }
}

export const Inset: Story = {
  args: {
    variant: 'inset',
    scale: 5,
    children: <Button label="Test 1" variant="primary" />
  }
}

export const Stack: Story = {
  args: {
    variant: 'stack',
    scale: 3,
    children: <SpacingBody />
  }
}

const CUSTOM_TOKENS: Partial<Record<keyof SpacingCSSProperties, string>> = {
  '--concorde-spacing-scale': 'number',
  '--concorde-spacing-align-items': 'string',
  '--concorde-spacing-justify-content': 'string'
}

export const CustomTokens = () => {
  return (
    <CustomTokensWrapper
      customTokens={CUSTOM_TOKENS as Record<string, string>}
    />
  )
}
