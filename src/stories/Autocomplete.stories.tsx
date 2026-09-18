import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import type { AutocompleteProps } from '..'
import {
  Autocomplete,
  Icon,
  List,
  ListItem,
  ListItemAdornment,
  ListItemContent
} from '..'

import { Container } from './components'
import './Autocomplete.stories.scss'

const options = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

const meta: Meta<typeof Autocomplete> = {
  title: 'Elements/Autocomplete',
  component: Autocomplete,
  parameters: {
    layout: 'centered'
  },
  args: {
    id: 'test-autocomplete-id',
    componentName: 'Autocomplete',
    isMenuFullWidth: true,
    freeSolo: false,
    isError: false,
    isDisabled: false,
    isRequired: false,
    isNotClearable: false,
    helperText: '',
    placeholder: 'Pick a month'
  },
  argTypes: {
    freeSolo: {
      control: { type: 'boolean' },
      description: 'If true, the input will act as a free-solo text field.'
    },
    value: {
      control: { type: 'object' },
      description: 'The value of the input.'
    },
    inputValue: {
      control: { type: 'text' },
      description: 'The value of the input.'
    },
    getOptionLabel: {
      control: false,
      description: 'Function that returns the label of the option.'
    },
    getOptionKey: {
      control: false,
      description: 'Function that returns the key of the option.'
    },
    getOptionSelected: {
      control: false,
      description: 'Function that returns the selected state of the option.'
    },
    isOptionEqualToValue: {
      control: false,
      description:
        'Function that returns the equality check of the option and value.'
    },
    triggerIconProps: {
      control: false,
      description: 'Props of the trigger icon. See Icon props.'
    },
    clearIconProps: {
      control: false,
      description: 'Props of the clear icon. See Icon props.'
    },
    triggerProps: {
      control: false,
      description: 'Props of the trigger input. See Input props.'
    },
    menuProps: {
      control: false,
      description: 'Props of the autocomplete menu. See Menu props.'
    },
    helperText: {
      control: 'text',
      description: 'The helper text displayed below the trigger input'
    },
    label: {
      control: 'text',
      description: 'The label of the trigger input'
    },
    placeholder: {
      control: 'text',
      description: 'The placeholder of the trigger input'
    },
    isDisabled: {
      control: 'boolean',
      description:
        'Disables the trigger input element.\n\nSee Input `isDisabled` prop.'
    },
    isRequired: {
      control: 'boolean',
      description:
        'Turns on the required state of the trigger input.\n\nSee Input `isRequired` prop.'
    },
    isNotClearable: {
      control: 'boolean',
      description:
        'Determines whether the autocomplete value is clearable or not.'
    },
    isError: {
      control: 'boolean',
      description:
        'Turns on the error state of the trigger input.\n\nSee Input `isError` prop.'
    },
    isLoading: {
      control: 'boolean',
      description:
        'Turns on the loading state of the trigger input. Helps to display the `noOptionsText` when loading is complete'
    },
    noOptionsText: {
      control: 'text',
      description:
        'The text displayed when there are no options to display. It is displayed when the Menu is not loading.'
    },
    isMenuFullWidth: {
      control: 'boolean',
      description:
        'Determines whether the Autocomplete menu width is synced with the trigger input width or not.\n\nDefaults to `true`'
    },
    onBlur: {
      control: false,
      description: 'Callback fired when the autocomplete is blurred.'
    },
    showCheckIcon: {
      control: 'boolean',
      description: 'Determines whether the icon is shown or not.'
    }
  },
  render: Object.assign(
    (args: AutocompleteProps<unknown, boolean, boolean, boolean>) => {
      const [value, setValue] = useState(args.value)
      const [inputValue, setInputValue] = useState('')

      return (
        <Autocomplete
          {...args}
          inputValue={inputValue}
          onChange={(_, value) => setValue(value)}
          onInputChange={(_, value) => setInputValue(value)}
          value={value}
        />
      )
    },
    {
      displayName: 'Autocomplete'
    }
  )
}

export default meta

type Story = StoryObj<typeof Autocomplete>

export const Default: Story = {
  args: {
    options,
    label: 'Select a month'
  }
}

export const DefaultValue: Story = {
  args: {
    options,
    label: 'Select a month',
    value: options[0]
  }
}

export const Disabled: Story = {
  args: {
    ...Default.args,
    isDisabled: true,
    id: 'test-autocomplete-id-disabled'
  }
}

export const Required: Story = {
  args: {
    ...Default.args,
    isRequired: true
  }
}

export const Loading: Story = {
  args: {
    ...Default.args,
    isLoading: true
  }
}

export const HelperText: Story = {
  args: {
    ...Default.args,
    helperText: 'This is a subtext'
  }
}

export const Error: Story = {
  args: {
    ...Default.args,
    isError: true,
    isRequired: true,
    helperText: 'This is an error subtext'
  }
}

export const DisabledOptions: Story = {
  args: {
    ...Default.args,
    getOptionDisabled: (option) => option === 'March' || option === 'July'
  }
}

export const NotClearable: Story = {
  args: {
    ...Default.args,
    isNotClearable: true,
    value: options[0]
  }
}

export const FreeSolo: Story = {
  args: {
    ...Default.args,
    freeSolo: true
  },
  parameters: {
    docs: {
      description: {
        story:
          'Free solo is a special case of single selection where the user can type in the input field and the input value is passed.'
      }
    }
  }
}

export const LeftAdorned: Story = {
  args: {
    ...Default.args,
    value: options[0],
    triggerProps: {
      startAdornment: <Icon name="info" />
    }
  }
}

export const ShowIcon: Story = {
  args: {
    ...Default.args,
    value: options[0],
    showCheckIcon: true
  }
}

export const ReplaceTriggerIcon: Story = {
  args: {
    ...Default.args,
    triggerIconProps: {
      label: <Icon name="info" />
    }
  }
}

export const FloatingLabel: Story = {
  args: {
    ...Default.args,
    value: options[0],
    triggerProps: {
      floatingLabel: 'Month'
    }
  }
}

type TestOption = { ab: string; value: string }

export const CustomSelectedFunction: Story = {
  args: {
    ...Default.args,
    value: { ab: 'Jan', value: 'January' },
    options: [
      {
        ab: 'Jan',
        value: 'January'
      },
      {
        ab: 'Feb',
        value: 'February'
      },
      {
        ab: 'Mar',
        value: 'March'
      },
      {
        ab: 'Apr',
        value: 'April'
      },
      {
        ab: 'May',
        value: 'May'
      },
      {
        ab: 'Jun',
        value: 'June'
      },
      {
        ab: 'Jul',
        value: 'July'
      },
      {
        ab: 'Aug',
        value: 'August'
      },
      {
        ab: 'Sep',
        value: 'September'
      },
      {
        ab: 'Oct',
        value: 'October'
      },
      {
        ab: 'Nov',
        value: 'November'
      },
      {
        ab: 'Dec',
        value: 'December'
      }
    ],
    getOptionLabel: (option) => (option as TestOption).ab,
    getOptionKey: (option) => (option as TestOption).ab,
    getOptionSelected: (option, value) =>
      (option as TestOption).ab === (value as TestOption).ab,
    isOptionEqualToValue: (option, value) =>
      (option as TestOption).ab === (value as TestOption).ab
  },
  render: Object.assign(
    (args: AutocompleteProps<unknown, boolean, boolean, boolean>) => {
      const [value, setValue] = useState(args.value)
      const [inputValue, setInputValue] = useState('')

      return (
        <Autocomplete
          {...args}
          inputValue={inputValue}
          onChange={(_, value) => setValue(value)}
          onInputChange={(_, value) => setInputValue(value)}
          value={value}
        />
      )
    },
    {
      displayName: 'Autocomplete'
    }
  )
}

export const Accessibility = () => {
  return (
    <Container>
      <List>
        <ListItem>
          <ListItemAdornment>
            <Icon name="check_circle" />
          </ListItemAdornment>
          <ListItemContent>
            {`Avoid using without an 'id' to correctly label the menu and trigger input.`}
          </ListItemContent>
        </ListItem>
      </List>
    </Container>
  )
}

export const CustomTokens = () => {
  return (
    <Container>
      <List>
        <ListItem>
          <ListItemContent>
            {`Refer to Input, Icon, Button & Menu Custom Tokens for more information.`}
          </ListItemContent>
        </ListItem>
      </List>
    </Container>
  )
}
