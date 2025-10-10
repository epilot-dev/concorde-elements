import type { Meta, StoryObj } from '@storybook/react'

import type { ExpandIconProps } from '..'
import { ExpandIcon, List, ListItem, ListItemContent } from '..'

import { Container } from './components'

const meta: Meta<ExpandIconProps> = {
  title: 'Elements/ExpandIcon',
  component: ExpandIcon,
  parameters: {
    layout: 'centered'
  },
  args: {
    isExpanded: false
  },
  argTypes: {
    isExpanded: {
      control: 'boolean',
      description: 'Decides the icon rotation state.\n\nDefaults to `false`'
    }
  }
}

export default meta

type Story = StoryObj<ExpandIconProps>

export const Default: Story = {}

export const CustomTokens = () => {
  return (
    <Container>
      <List>
        <ListItem>
          <ListItemContent>
            {`Refer to Icon Custom Tokens for more information.`}
          </ListItemContent>
        </ListItem>
      </List>
    </Container>
  )
}
