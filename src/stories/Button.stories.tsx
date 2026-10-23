import type { Meta, StoryObj } from '@storybook/react'

import type { ButtonCSSProperties, ButtonProps } from '..'
import { Button, Icon } from '..'

import { CustomTokensWrapper } from './components'

const meta: Meta<ButtonProps> = {
  title: 'Elements/Button',
  component: Button,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Sets the content of the button'
    },
    variant: {
      control: 'select',
      options: [
        'primary',
        'ghost',
        'primary-danger',
        'ghost-danger',
        'outlined',
        'disabled',
        'bare'
      ],
      description: 'Sets the color variants of the button.'
    },
    color: {
      control: 'color',
      description: 'Overrides the font color and icon color of the button'
    },
    backgroundColor: {
      control: 'color',
      description: 'Overrides the background color of the button.'
    },
    hoverBgColor: {
      control: 'color',
      description: 'Overrides the hover background color of the button.'
    },
    activeBgColor: {
      control: 'color',
      description: 'Overrides the active background color of the button.'
    }
  }
}

export default meta

type Story = StoryObj<ButtonProps>

export const Primary: Story = {
  args: {
    label: 'Button',
    variant: 'primary'
  }
}

export const Ghost: Story = {
  args: {
    label: 'Button',
    variant: 'ghost'
  }
}

export const PrimaryDanger: Story = {
  args: {
    label: 'Button',
    variant: 'primary-danger'
  }
}

export const GhostDanger: Story = {
  args: {
    label: 'Button',
    variant: 'ghost-danger'
  }
}

export const Outlined: Story = {
  args: {
    label: 'Button',
    variant: 'outlined'
  }
}

export const Disabled: Story = {
  args: {
    label: 'Button',
    variant: 'disabled'
  }
}

export const DisabledPrimaryButton: Story = {
  args: {
    label: 'Button',
    variant: 'primary',
    isDisabled: true
  }
}

export const DisabledGhostButton: Story = {
  args: {
    label: 'Button',
    variant: 'ghost',
    isDisabled: true
  }
}

export const DisabledOutlinedButton: Story = {
  args: {
    label: 'Button',
    variant: 'outlined',
    isDisabled: true
  }
}

export const LeftIconButton: Story = {
  args: {
    label: 'Button',
    variant: 'ghost',
    leftIcon: <Icon name="info" />
  }
}

export const RightIconButton: Story = {
  args: {
    label: 'Button',
    variant: 'primary',
    rightIcon: <Icon name="close" />
  }
}

export const IconsButton: Story = {
  args: {
    label: 'Button',
    variant: 'primary',
    leftIcon: <Icon name="info" />,
    rightIcon: <Icon name="close" />
  }
}

export const LinkButton: Story = {
  args: {
    label: 'Button',
    variant: 'primary',
    isLink: true,
    href: 'https://www.google.com',
    rel: 'noopener',
    target: '_blank',
    rightIcon: <Icon name="open_in_new" />
  }
}

const CUSTOM_TOKENS: ButtonCSSProperties = {
  '--concorde-button-label-color': 'string',
  '--concorde-button-background-color': 'string',
  '--concorde-button-hover-bg-color': 'string',
  '--concorde-button-active-bg-color': 'string',
  '--concorde-button-gap': 'string',
  '--concorde-primary-button-background-color': 'string',
  '--concorde-primary-button-hover-bg-color': 'string',
  '--concorde-outlined-button-border-color': 'string'
}

export const CustomTokens = () => {
  return (
    <CustomTokensWrapper
      customTokens={CUSTOM_TOKENS as Record<string, string>}
    />
  )
}
