import type { Meta, StoryObj } from '@storybook/react'

import type { DatePickerCSSProperties } from '..'
import {
  DatePicker,
  Icon,
  List,
  ListItem,
  ListItemAdornment,
  ListItemContent
} from '..'

import './DatePicker.stories.scss'
import { Container, CustomTokensWrapper } from './components'

const meta: Meta<typeof DatePicker> = {
  title: 'Elements/DatePicker',
  component: DatePicker,
  args: {
    date: new Date(),
    isDisabled: false,
    isOnlyTimeSelect: false,
    isTimeSelectVisible: true,
    timeIntervals: 30,
    dateFormat: 'dd.MM.yyyy, HH:mm',
    timeFormat: 'HH:mm',
    yearDiff: 30,
    inputProps: {
      isRequired: false,
      isError: false,
      helperText: ''
    },
    id: 'test-id'
  },
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    calendarBgColor: {
      control: 'color',
      description: 'Custom background color of the calendar'
    },
    selectedColor: {
      control: 'color',
      description: 'Custom selected color of the day and time'
    },
    selectedBgColor: {
      control: 'color',
      description: 'Custom selected background color of the day and time'
    },
    separationColor: {
      control: 'color',
      description:
        'Custom color of the separation line between the date and time select'
    },
    style: { control: false },
    locale: { control: false },
    disableDays: {
      control: 'object',
      options: [0, 1, 2, 3, 4, 5, 6]
    },
    date: { control: 'date' },
    minDate: { control: 'date' },
    maxDate: { control: 'date' }
  }
}

export default meta

type Story = StoryObj<typeof DatePicker>

export const Default: Story = {}

export const DateSelect: Story = {
  args: {
    isTimeSelectVisible: false
  }
}

export const TimeSelect: Story = {
  args: {
    isOnlyTimeSelect: true
  }
}

export const Colored: Story = {
  args: {
    calendarBgColor: '#cdf9e2',
    selectedColor: '#ffffff',
    selectedBgColor: '#0b883e',
    separationColor: '#10d559'
  }
}

export const Disabled: Story = {
  args: {
    isDisabled: true
  }
}

export const LabeledInput: Story = {
  args: {
    inputProps: {
      label: 'Date Picker'
    }
  }
}

export const RequiredInput: Story = {
  args: {
    inputProps: {
      label: 'Date Picker',
      isRequired: true
    }
  }
}

export const InputHelperText: Story = {
  args: {
    inputProps: {
      helperText: 'Helper text'
    }
  }
}

export const ErroredInput: Story = {
  args: {
    inputProps: {
      label: 'Date Picker',
      isRequired: true,
      isError: true
    }
  }
}

export const DateRange: Story = {
  args: {
    inputProps: {
      label: 'Date Picker',
      isRequired: true
    },
    minDate: new Date(),
    maxDate: new Date(new Date().setDate(new Date().getDate() + 3))
  }
}

export const DisabledWeekends: Story = {
  args: {
    inputProps: {
      label: 'Date Picker',
      isRequired: true
    },
    disableDays: [0, 6]
  }
}

export const ENLocale: Story = {
  args: {
    locale: 'en'
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
            Avoid using the DatePicker without an id
          </ListItemContent>
        </ListItem>
      </List>
    </Container>
  )
}

const CUSTOM_TOKENS: DatePickerCSSProperties = {
  '--concorde-datepicker-calendar-bg-color': 'string',
  '--concorde-datepicker-day-color': 'string',
  '--concorde-datepicker-day-name-color': 'string',
  '--concorde-datepicker-separation-color': 'string',
  '--concorde-datepicker-selected-color': 'string',
  '--concorde-datepicker-selected-bg-color': 'string',
  '--concorde-datepicker-header-navigation-icon-color': 'string',
  '--concorde-datepicker-border-radius': 'string'
}

export const CustomTokens = () => {
  return (
    <CustomTokensWrapper
      customTokens={CUSTOM_TOKENS as Record<string, string>}
    />
  )
}
