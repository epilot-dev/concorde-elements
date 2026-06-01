import type { Meta, StoryObj } from '@storybook/react'

import type { LinkCSSProperties, LinkProps } from '..'
import { Link } from '..'

import { CustomTokensWrapper } from './components'

const meta: Meta<LinkProps> = {
  title: 'Elements/Link',
  component: Link,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    children: { control: false },
    isDisabled: {
      control: 'boolean',
      description: 'Disables the link.\n\nDefaults to `false`'
    },
    color: { control: 'color', description: 'Color of the link.' },
    hoverColor: { control: 'color', description: 'Hover color of the link.' }
  }
}

export default meta

type Story = StoryObj<LinkProps>

export const DefaultLink: Story = {
  args: {
    href: '/',
    target: '_blank',
    rel: 'noopener noreferrer',
    children: 'Test link'
  }
}

export const ColoredLink: Story = {
  args: {
    ...DefaultLink.args,
    color: 'red',
    hoverColor: 'darkred'
  }
}

export const DisabledLink: Story = {
  args: {
    ...DefaultLink.args,
    isDisabled: true
  }
}

const CUSTOM_TOKENS: LinkCSSProperties = {
  '--concorde-link-color': 'string',
  '--concorde-link-hover-color': 'string'
}

export const CustomTokens = () => {
  return (
    <CustomTokensWrapper
      customTokens={CUSTOM_TOKENS as Record<string, string>}
    />
  )
}
