import type { Meta, StoryObj } from '@storybook/react'

import type { ListItemCSSProperties, ListItemProps } from '..'
import {
  Icon,
  ListItem,
  ListItemAdornment,
  ListItemContent,
  Typography
} from '..'

import { CustomTokensWrapper } from './components'

function ListBody({
  hasStartAdornment,
  hasEndAdornment
}: {
  hasStartAdornment?: boolean
  hasEndAdornment?: boolean
}) {
  return (
    <ListItem>
      {hasStartAdornment && (
        <ListItemAdornment>
          <Icon name="check_circle" />
        </ListItemAdornment>
      )}
      <ListItemContent>
        <Typography>Feature 1</Typography>
      </ListItemContent>
      {hasEndAdornment && (
        <ListItemAdornment>
          <Icon name="close" />
        </ListItemAdornment>
      )}
    </ListItem>
  )
}
const meta: Meta<ListItemProps> = {
  title: 'Elements/List/ListItem',
  component: ListItem,
  parameters: {
    layout: 'centered'
  },
  args: {
    isDisabled: false,
    isSelected: false,
    isClickable: false
  },
  argTypes: {
    children: { control: false },
    onClick: { control: false },
    isSelected: {
      control: 'boolean',
      description: 'Turn on selected styles on the list item option.'
    },
    isClickable: {
      control: 'boolean',
      description: 'Turns on clickable styles if `onClick` is not set.'
    },
    isDisabled: {
      control: 'boolean',
      description: 'Disables click events on the list item option'
    },
    hoverColor: {
      control: 'color',
      description:
        'Sets the color of the list item on hover, when it is clickable.'
    },
    hoverBgColor: {
      control: 'color',
      description:
        'Sets the background color of the list item on hover, when it is clickable.'
    },
    selectedColor: {
      control: 'color',
      description: 'Sets the color of the list item, when it is selected.'
    },
    selectedBgColor: {
      control: 'color',
      description:
        'Sets the background color of the list item, when it is selected.'
    }
  }
}

export default meta

type Story = StoryObj<ListItemProps>

export const Regular: Story = {
  args: {
    children: <ListBody />
  }
}

export const Clickable: Story = {
  args: {
    children: <ListBody />,
    isClickable: true,
    hoverColor: 'red',
    hoverBgColor: '#f4dbdb'
  }
}

export const Option: Story = {
  args: {
    children: <ListBody />,
    // eslint-disable-next-line no-console
    onClick: () => console.log('Clicked')
  }
}

export const DisabledOption: Story = {
  args: {
    ...Option.args,
    isDisabled: true
  }
}

export const SelectedOption: Story = {
  args: {
    ...Option.args,
    isSelected: true,
    selectedColor: 'red',
    selectedBgColor: '#f4dbdb'
  }
}

export const StartAdornment: Story = {
  args: {
    children: <ListBody hasStartAdornment />
  }
}

export const EndAdornment: Story = {
  args: {
    children: <ListBody hasEndAdornment />
  }
}

export const StartAndEndAdornment: Story = {
  args: {
    children: <ListBody hasEndAdornment hasStartAdornment />
  }
}

const CUSTOM_TOKENS: ListItemCSSProperties = {
  '--concorde-list-item-hover-background-color': 'string',
  '--concorde-list-item-hover-color': 'string',
  '--concorde-list-item-selected-background-color': 'string',
  '--concorde-list-item-selected-color': 'string'
}

export const CustomTokens = () => {
  return (
    <CustomTokensWrapper
      customTokens={CUSTOM_TOKENS as Record<string, string>}
    />
  )
}
