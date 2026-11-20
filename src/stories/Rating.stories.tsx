import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import type { RatingCSSProperties, RatingProps } from '..'
import { List, ListItem, ListItemContent, Rating } from '..'

import { CustomTokensWrapper } from './components'

const meta: Meta<RatingProps> = {
  title: 'Elements/Rating',
  component: Rating,
  parameters: {
    layout: 'centered'
  },
  args: {
    id: 'test-rating',
    max: 5,
    iconName: 'star',
    labels: ['1', '2', '3', '4', '5']
  },
  argTypes: {
    labels: {
      control: 'object',
      description: 'Sets the labels of the ratings.'
    },
    max: {
      control: 'number',
      description: 'Sets the maximum value of the rating.'
    },
    value: {
      control: 'number',
      description: 'Sets the value of the rating.'
    },
    onChange: {
      control: false,
      description:
        'Callback function that is called when the rating is clicked.'
    }
  },
  render: Object.assign(
    ({ value, ...args }: RatingProps) => {
      const [rating, setRating] = useState(value || -1)

      const handleChange = (value: number) => {
        setRating(value)
      }

      return <Rating {...args} onChange={handleChange} value={rating} />
    },
    {
      displayName: 'Rating'
    }
  )
}

export default meta

type Story = StoryObj<RatingProps>

export const Default: Story = {
  args: {}
}

export const Valued: Story = {
  args: {
    ...Default.args,
    value: 4,
    id: 'test-rating2'
  }
}

const CUSTOM_TOKENS: RatingCSSProperties = {
  '--concorde-rating-unchecked-color': 'string',
  '--concorde-rating-checked-color': 'string'
}

export const CustomTokens = () => {
  return (
    <CustomTokensWrapper customTokens={CUSTOM_TOKENS as Record<string, string>}>
      <List>
        <ListItem>
          <ListItemContent>
            {`Also refer to IconButton Custom Tokens for more information.`}
          </ListItemContent>
        </ListItem>
      </List>
    </CustomTokensWrapper>
  )
}
