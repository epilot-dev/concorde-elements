import type { Meta, StoryObj } from '@storybook/react'

import type { CardCSSProperties, CardProps } from '..'
import { Card, Typography } from '..'

import { CustomTokensWrapper } from './components'

function CardBody() {
  return (
    <>
      <Typography as="h2">Test card</Typography>
      <Typography>This is a test card description</Typography>
    </>
  )
}
const meta: Meta<CardProps> = {
  title: 'Elements/Card',
  component: Card,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    children: { control: false },
    backgroundColor: {
      control: 'color',
      description: 'Hover background color of the card'
    }
  }
}

export default meta

type Story = StoryObj<CardProps>

export const RegularCard: Story = {
  args: {
    children: <CardBody />
  }
}

const CUSTOM_TOKENS: CardCSSProperties = {
  '--concorde-card-background-color': 'string',
  '--concorde-card-hover-background-color': 'string'
}

export const CustomTokens = () => {
  return (
    <CustomTokensWrapper
      customTokens={CUSTOM_TOKENS as Record<string, string>}
    />
  )
}
