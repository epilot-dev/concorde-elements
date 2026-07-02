import type { Meta, StoryObj } from '@storybook/react'

import type { ToggleGroupCSSProperties, ToggleGroupProps } from '..'
import {
  ToggleGroupItem,
  ToggleGroup,
  Icon,
  List,
  ListItem,
  ListItemContent
} from '..'

import { CustomTokensWrapper } from './components'

const meta: Meta<ToggleGroupProps> = {
  title: 'Elements/Toggle Group',
  component: ToggleGroup,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    type: {
      control: 'radio',
      options: ['single', 'multiple'],
      description: 'Sets how many options can be selected at once'
    },
    loop: {
      control: 'boolean',
      description:
        'When true and rovingFocus is true, keyboard navigation will loop from last item to first, and vice versa.'
    },
    error: {
      control: 'text',
      description: 'Error message to display when the group is not filled out.'
    },
    disabled: {
      control: 'boolean',
      description:
        'When true, prevents the user from interacting with the toggle group and all its items.'
    },
    isRequired: {
      control: 'boolean',
      description: 'Treats the component as required.'
    },
    value: {
      description:
        'The controlled value of the pressed items. Must be used in conjunction with onValueChange.'
    },
    onValueChange: {
      control: false,
      description:
        'Event handler called when the pressed state of an item changes.'
    },
    defaultValue: {
      control: false,
      description:
        'The value of the item to show as pressed when initially rendered. Use when you do not need to control the state of the items.'
    },
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description:
        'The orientation of the component, which determines how focus moves: horizontal for left/right arrows and vertical for up/down arrows.'
    },
    rovingFocus: {
      control: false,
      description:
        'When false, navigating through the items using arrow keys will be disabled.'
    },
    children: {
      control: false
    }
  }
}

export default meta

type Story = StoryObj<ToggleGroupProps>

export const Default: Story = {
  args: {
    'aria-label': 'Salutations',
    defaultValue: 'Mr.',
    type: 'single',
    children: (
      <>
        <ToggleGroupItem aria-label="Mr." label="Mr." value="Mr." />
        <ToggleGroupItem
          aria-label="Ms. / Mrs."
          label="Ms. / Mrs."
          value="Ms. / Mrs."
        />
        <ToggleGroupItem aria-label="Other" label="Other" value="Other" />
      </>
    )
  }
}
export const Multiple: Story = {
  args: {
    'aria-label': 'Letters of the alphabet',
    defaultValue: ['A', 'B'],
    type: 'multiple',
    children: (
      <>
        <ToggleGroupItem aria-label="First letter" label="A" value="A" />
        <ToggleGroupItem aria-label="Second letter" label="B" value="B" />
        <ToggleGroupItem aria-label="Third letter" label="C" value="C" />
      </>
    )
  }
}

export const Required: Story = {
  args: {
    'aria-label': 'Letters of the alphabet',
    defaultValue: 'A',
    type: 'single',
    isRequired: true,
    children: (
      <>
        <ToggleGroupItem aria-label="First letter" label="A" value="A" />
        <ToggleGroupItem aria-label="Second letter" label="B" value="B" />
        <ToggleGroupItem aria-label="Third letter" label="C" value="C" />
      </>
    )
  }
}

export const Disabled: Story = {
  args: {
    'aria-label': 'Letters of the alphabet',
    defaultValue: 'A',
    type: 'single',
    disabled: true,
    children: (
      <>
        <ToggleGroupItem
          aria-label="First letter"
          label="A"
          leftIcon={<Icon name="info" />}
          value="A"
        />
        <ToggleGroupItem aria-label="Second letter" label="B" value="B" />
        <ToggleGroupItem aria-label="Third letter" label="C" value="C" />
      </>
    )
  }
}

export const Error: Story = {
  args: {
    'aria-label': 'Letters of the alphabet',
    defaultValue: 'A',
    type: 'single',
    error: 'Please select a letter',
    children: (
      <>
        <ToggleGroupItem
          aria-label="First letter"
          label="A"
          leftIcon={<Icon name="info" />}
          value="A"
        />
        <ToggleGroupItem aria-label="Second letter" label="B" value="B" />
        <ToggleGroupItem aria-label="Third letter" label="C" value="C" />
      </>
    )
  }
}

const CUSTOM_TOKENS: ToggleGroupCSSProperties = {
  '--concorde-toggle-button-border-color': 'string'
}

export const CustomTokens = () => {
  return (
    <CustomTokensWrapper customTokens={CUSTOM_TOKENS as Record<string, string>}>
      <List>
        <ListItem>
          <ListItemContent>
            {`Refer to Button Custom Tokens for more information.`}
          </ListItemContent>
        </ListItem>
      </List>
    </CustomTokensWrapper>
  )
}
