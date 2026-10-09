import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import type { DropdownCSSProperties, DropdownValue, DropdownXProps } from '..'
import {
  DropdownX,
  List,
  ListItem,
  ListItemAdornment,
  ListItemContent,
  Icon
} from '../'

import './DropdownX.stories.scss'
import { Container, CustomTokensWrapper } from './components'

const items = [
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

function getOptions() {
  return items.map((item) => ({
    label: item,
    value: item
  }))
}

const meta: Meta<typeof DropdownX> = {
  title: 'Elements/Dropdown/DropdownX',
  component: DropdownX,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Opinionated version of Dropdown which extends the Menu Component and Radix UI Dropdown Menu, and uses the Input component as the trigger'
      }
    }
  },
  args: {
    options: getOptions(),
    'aria-label': 'Menu',
    id: 'test-id',
    inputId: 'test-input-id',
    isMulti: false,
    isMenuFullWidth: true,
    sideOffset: 0,
    separator: ', ',
    isClearable: false
  },
  argTypes: {
    children: { control: false },
    value: {
      control: false,
      description:
        'Selected value of the menu.\n\nCan be single value or array of values.'
    },
    defaultValue: {
      control: false,
      description:
        'Default selected value of the menu.\n\nCan be single value or array of values.'
    },
    displayValue: {
      control: false,
      description:
        'Overrides the default display value of the selected value. Works with `value` prop\n\nDefaults to label of options separated by the `separator` prop.'
    },
    open: {
      control: 'boolean',
      description:
        'The controlled open state of the dropdown menu. Must be used in conjunction with `onOpenChange`.'
    },
    onOpenChange: {
      control: false,
      description:
        'Event handler called when the open state of the dropdown menu changes.'
    },
    options: {
      control: false,
      description: 'Options of the menu.'
    },
    disabledLabels: {
      control: false,
      description: 'Set specific option labels as disabled on the menu.'
    },
    isMulti: {
      control: 'boolean',
      description:
        'Set to true to allow selecting multiple options.\n\nDefaults to `false`.'
    },
    isMenuFullWidth: {
      control: 'boolean',
      description:
        'Forces the menu to be the same width as the trigger input width.\n\nDefaults to `true`.'
    },
    id: {
      control: 'text',
      description: 'id of the menu.'
    },
    inputId: {
      control: 'text',
      description: 'id of the trigger input.'
    },
    isDisabled: {
      control: 'boolean',
      description:
        'Disables the trigger input element..\n\nSee Input `isDisabled` prop.'
    },
    isRequired: {
      control: 'boolean',
      description:
        'Turns on the required state of the trigger input.\n\nSee Input `isRequired` prop.'
    },
    isClearable: {
      control: 'boolean',
      description:
        'Determines whether the dropdown is clearable or not. Works with `onClear` prop'
    },
    isError: {
      control: 'boolean',
      description:
        'Turns on the error state of the trigger input.\n\nSee Input `isError` prop.'
    },
    triggerIcon: {
      control: false,
      description:
        'Custom component which overrides the default Input adornment icon. Also overrides `clearIcon` if set.\n\nDefaults to `ExpandMore` component.\n\nIf set, pass `onOpenChange` as a custom `onClick` handler to trigger opening the dropdown menu. See Icon props.'
    },
    clearIcon: {
      control: false,
      description:
        'Custom component which is displayed when the dropdown is clearable. Is displayed only when `isClearable` is true.\n\nDefaults to `<Icon name="close" />` component.\n\nIf set, pass custom `onClick` handler as a prop to clear the dropdown menu selection. If `triggerIcon` is set, this is overridden. See Icon props.'
    },
    helperText: {
      control: 'text',
      description: 'The helper text displayed below the trigger input'
    },
    onSelect: {
      control: false,
      description: 'Callback fired when a menu item is clicked.'
    },
    onClear: {
      control: false,
      description:
        'Handler for clearing the selected value. Works with `isClearable`'
    },
    separator: {
      control: 'text',
      description:
        'Sets the multi-select display value separator.\n\nDefaults to `", "`.'
    },
    triggerProps: {
      control: false,
      description: 'Props of the trigger input element.\n\nSee Input props'
    },
    portalProps: {
      control: false,
      description:
        'Props of the portal element.\n\nSee Radix UI Dropdown Menu Portal Props'
    },
    containerProps: {
      control: false,
      description: 'Props of the dropdown container element'
    },
    align: {
      control: 'radio',
      options: ['start', 'center'], // end is not supported for now
      description:
        'Sets the alignment of the dropdown menu relative to the trigger element. Active on `isMenuFullWidth` set to `false`.\n\nDefaults to `center`'
    },
    hoverColor: {
      control: 'color',
      description:
        'Sets the color of the menu item on hover, when it is clickable'
    },
    hoverBgColor: {
      control: 'color',
      description:
        'Sets the background color of the menu items on hover, when it is clickable'
    },
    selectedColor: {
      control: 'color',
      description:
        'Sets the color of the menu items, when it is selected.\n\nDefaults to `hoverColor` if set'
    },
    selectedBgColor: {
      control: 'color',
      description:
        'Sets the background color of the menu items, when it is selected..\n\nDefaults to `hoverBgColor` if set'
    },
    readOnly: {
      control: 'boolean',
      description: 'Sets the dropdown to read-only state'
    }
  },
  render: Object.assign(
    ({
      defaultOpen,
      defaultValue,
      options,
      isMulti,
      value,
      ...args
    }: DropdownXProps) => {
      const [selectedValue, setSelectedValue] = useState(value || defaultValue)
      const [open, setOpen] = useState(defaultOpen || false)

      function toggleOpen() {
        setOpen((prevOpen) => !prevOpen)
      }

      function isValueSelected(optionValue: DropdownValue) {
        if (isMulti) {
          return (selectedValue as DropdownValue[])?.includes(optionValue)
        }

        return optionValue === selectedValue
      }

      function handleSelect(value: DropdownValue) {
        if (isValueSelected(value)) {
          setSelectedValue((prevSelectedValue) => {
            if (
              isMulti &&
              (Array.isArray(prevSelectedValue) ||
                prevSelectedValue === undefined)
            ) {
              return (prevSelectedValue as string[])?.filter(
                (prevSelected) => prevSelected !== value
              )
            }

            return undefined
          })

          return
        }

        setSelectedValue((prevSelectedValue) => {
          if (isMulti) {
            return [...((prevSelectedValue as DropdownValue[]) || []), value]
          }

          return value
        })
      }

      function handleClear() {
        setSelectedValue(undefined)
      }

      return (
        <DropdownX
          {...(args as DropdownXProps)}
          defaultValue={defaultValue as DropdownValue}
          isMulti={isMulti}
          onClear={handleClear}
          onOpenChange={toggleOpen}
          onSelect={handleSelect}
          open={open}
          options={options}
          value={selectedValue as DropdownValue}
        />
      )
    },
    {
      displayName: 'DropdownX'
    }
  )
}

export default meta

type Story = StoryObj<typeof DropdownX>

export const Default: Story = {
  args: {
    options: getOptions(),
    label: 'Select a month',
    align: 'start'
  }
}

export const Multi: Story = {
  args: {
    options: getOptions(),
    label: 'Select months',
    isMulti: true
  }
}

export const Disabled: Story = {
  args: {
    ...Default.args,
    isDisabled: true,
    id: 'test-id-disabled',
    inputId: 'test-input-id-disabled'
  }
}

export const Required: Story = {
  args: {
    ...Default.args,
    isRequired: true
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

export const ReadOnly: Story = {
  args: {
    ...Default.args,
    readOnly: true,
    value: 'January',
    helperText: 'This field is read-only'
  }
}

export const DisabledOptions: Story = {
  args: {
    ...Default.args,
    disabledLabels: ['March', 'July']
  }
}

export const Clearable: Story = {
  args: {
    ...Default.args,
    isClearable: true
  }
}

export const LeftAdorned: Story = {
  args: {
    ...Default.args,
    triggerProps: {
      startAdornment: <Icon name="info" />
    }
  }
}

export const ReplaceTriggerIcon: Story = {
  args: {
    ...Default.args,
    triggerIcon: <Icon name="info" />
  }
}

export const ColoredMenu: Story = {
  args: {
    ...Default.args,
    hoverColor: '#a0f6cc',
    hoverBgColor: '#100f11',
    selectedColor: '#f4f4f4',
    selectedBgColor: '#5447ec'
  }
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
            {`Avoid using without an 'aria-label', as screen readers need this for the menu title.`}
          </ListItemContent>
        </ListItem>
        <ListItem>
          <ListItemAdornment>
            <Icon name="check_circle" />
          </ListItemAdornment>
          <ListItemContent>
            {`Avoid using without an 'id' and 'inputId' to correctly label the menu and trigger input.`}
          </ListItemContent>
        </ListItem>
      </List>
    </Container>
  )
}

const CUSTOM_TOKENS: DropdownCSSProperties = {
  '--concorde-dropdown-menu-width': 'string'
}

export const CustomTokens = () => {
  return (
    <CustomTokensWrapper customTokens={CUSTOM_TOKENS as Record<string, string>}>
      <List>
        <ListItem>
          <ListItemContent>
            {`Also refer to Input, Icon, Button & Menu Custom Tokens for more information.`}
          </ListItemContent>
        </ListItem>
      </List>
    </CustomTokensWrapper>
  )
}
