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
    isFeatured: {
      control: 'boolean',
      description: 'Tags the card as featured or not. Defaults to `false`'
    },
    featuredText: {
      control: 'text',
      description:
        'Text on the featured card component.\n\nNote: This prop only works when `isFeatured` is `true`'
    },
    featuredColor: {
      control: 'color',
      description:
        'Color of the featured card component. Defaults to `#efbf02` \n\nNote: This prop only works when `isFeatured` is `true`'
    },
    featuredLabelColor: {
      control: 'color',
      description:
        'Color of the featured card label. Defaults to `#ffffff` \n\nNote: This prop only works when `isFeatured` is `true`'
    },
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

export const FeaturedCard: Story = {
  args: {
    children: <CardBody />,
    isFeatured: true,
    featuredText: 'Best Card'
  }
}

export const CustomFeaturedColor: Story = {
  args: {
    children: <CardBody />,
    isFeatured: true,
    featuredText: 'Best Card',
    featuredColor: '#ff0000'
  }
}

export const CustomFeaturedLabelColor: Story = {
  args: {
    children: <CardBody />,
    isFeatured: true,
    featuredText: 'Best Card',
    featuredColor: '#000000',
    featuredLabelColor: '#ffa7a7'
  }
}

const CUSTOM_TOKENS: CardCSSProperties = {
  '--concorde-card-featured-text': 'string',
  '--concorde-card-featured-color': 'string',
  '--concorde-card-featured-label-color': 'string',
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
