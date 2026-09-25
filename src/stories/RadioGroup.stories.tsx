import type { Meta, StoryObj } from '@storybook/react'

import type { RadioGroupCSSProperties, RadioGroupProps } from '..'
import { Radio, RadioGroup, List, ListItem, ListItemContent } from '..'

import { CustomTokensWrapper } from './components'

const meta: Meta<RadioGroupProps> = {
  title: 'Elements/Radio Group',
  component: RadioGroup,
  parameters: {
    layout: 'centered'
  },
  args: {
    orientation: 'horizontal',
    labelPlacement: 'end',
    size: '24px'
  },
  argTypes: {
    isDisabled: {
      control: 'boolean',
      description:
        'When true, prevents the user from interacting with radio items.'
    },
    isRequired: {
      control: 'boolean',
      description:
        'When true, indicates that the user must check a radio item before the owning form can be submitted.'
    },
    labelPlacement: {
      control: 'radio',
      options: ['top', 'bottom', 'start', 'end'],
      description: 'Sets the label placement of the radio input field.'
    },
    size: {
      control: 'text',
      description: 'Size of the radio icon.'
    },
    value: {
      description:
        'The controlled value of the radio item to check. Should be used in conjunction with `onChange`.'
    },
    onChange: {
      control: false,
      description: 'Event handler called when the value changes.'
    },
    defaultValue: {
      description:
        'The value of the radio item that should be checked when initially rendered. Use when you do not need to control the state of the radio items.'
    },
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
      description: 'The orientation of the component.'
    },
    children: {
      control: false
    },
    color: {
      control: 'color',
      description: 'Sets the color of the radio labels.'
    },
    errorColor: {
      control: 'color',
      description: 'Sets the error state color of the radio input fields.'
    },
    uncheckedColor: {
      control: 'color',
      description: 'Sets the unchecked state color of the radio icosn.'
    }
  }
}

export default meta

type Story = StoryObj<RadioGroupProps>

export const Default: Story = {
  args: {
    defaultValue: 'A',
    children: (
      <>
        <Radio aria-label="First letter" label="A" value="A" />
        <Radio aria-label="Second letter" label="B" value="B" />
        <Radio aria-label="Third letter" label="C" value="C" />
      </>
    )
  }
}

export const Vertical: Story = {
  args: {
    ...Default.args,
    orientation: 'vertical'
  }
}

export const Disabled: Story = {
  args: {
    ...Default.args,
    isDisabled: true
  }
}

export const Sized: Story = {
  args: {
    ...Default.args,
    size: '32px'
  }
}

export const Required: Story = {
  args: {
    ...Default.args,
    isRequired: true
  }
}

export const StartPosition: Story = {
  args: {
    ...Default.args,
    labelPlacement: 'start'
  }
}

export const TopPosition: Story = {
  args: {
    ...Default.args,
    labelPlacement: 'top'
  }
}

export const BottomPosition: Story = {
  args: {
    ...Default.args,
    labelPlacement: 'bottom'
  }
}

export const Error: Story = {
  args: {
    ...Default.args,
    isError: true,
    isRequired: true,
    error: 'I am an error message'
  }
}

const CUSTOM_TOKENS: Partial<Record<keyof RadioGroupCSSProperties, string>> = {
  '--concorde-radio-group-scale': 'number'
}

export const CustomTokens = () => {
  return (
    <CustomTokensWrapper customTokens={CUSTOM_TOKENS as Record<string, string>}>
      <List>
        <ListItem>
          <ListItemContent>
            {`Also refer to Radio Custom Tokens for more information.`}
          </ListItemContent>
        </ListItem>
      </List>
    </CustomTokensWrapper>
  )
}
