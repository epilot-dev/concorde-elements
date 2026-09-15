import type { Meta, StoryObj } from '@storybook/react'

import type { TypographyCSSProperties } from '..'
import { Typography } from '..'

import { CustomTokensWrapper } from './components'

const meta: Meta<typeof Typography> = {
  title: 'Elements/Typography',
  component: Typography,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'error', 'disabled'],
      description: 'Typography variant'
    },
    as: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'],
      description:
        'html element that component will be rendered as.\n\nDefaults to the paragraph element'
    }
  }
}

export default meta

type Story = StoryObj<typeof Typography>

export const Heading1: Story = {
  args: {
    as: 'h1',
    children: 'Heading 1'
  }
}

export const Heading2: Story = {
  args: {
    as: 'h2',
    children: 'Heading 2'
  }
}

export const Heading: Story = {
  args: {
    as: 'h3',
    children: 'Heading 3'
  }
}

export const Heading4: Story = {
  args: {
    as: 'h4',
    children: 'Heading 4'
  }
}

export const Heading5: Story = {
  args: {
    as: 'h5',
    children: 'Heading 5'
  }
}

export const Heading6: Story = {
  args: {
    as: 'h6',
    children: 'Heading 6'
  }
}

export const Paragraph: Story = {
  args: {
    as: 'p',
    children: 'Paragraph',
    style: {
      fontWeight: 700
    },
    className: 'test-class'
  }
}

export const ErrorVariant: Story = {
  args: {
    as: 'p',
    children: 'Paragraph',
    style: {
      fontWeight: 700
    },
    variant: 'error'
  }
}

export const SecondaryVariant: Story = {
  args: {
    as: 'p',
    children: 'Paragraph',
    style: {
      fontWeight: 700
    },
    variant: 'secondary'
  }
}

export const DisabledVariant: Story = {
  args: {
    as: 'p',
    children: 'Paragraph',
    style: {
      fontWeight: 700
    },
    variant: 'disabled'
  }
}

const CUSTOM_TOKENS: TypographyCSSProperties = {
  '--concorde-typography-color': 'string'
}

export const CustomTokens = () => {
  return (
    <CustomTokensWrapper
      customTokens={CUSTOM_TOKENS as Record<string, string>}
    />
  )
}
