import type { Meta, StoryObj } from '@storybook/react'
import * as React from 'react'

import type { DropdownMenuRootProps } from '..'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuItemContent,
  Button,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuRoot,
  DropdownMenuItemAdornment,
  Icon,
  DropdownMenuPortal
} from '..'

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

const options = getOptions()

const DropdownTriggerBody = (
  <DropdownMenuTrigger asChild>
    <Button label="Select a month" variant="primary" />
  </DropdownMenuTrigger>
)

const DropdownMenuBody = (
  <>
    {options?.map((option, index) => (
      <DropdownMenuItem key={index}>
        <DropdownMenuItemAdornment isSelected={option.value === 'December'}>
          <Icon name="check" />
        </DropdownMenuItemAdornment>
        <DropdownMenuItemContent>{option.label}</DropdownMenuItemContent>
      </DropdownMenuItem>
    ))}
  </>
)

const meta: Meta<DropdownMenuRootProps> = {
  title: 'Elements/Dropdown/Dropdown',
  component: DropdownMenuRoot,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    children: { control: false }
  },
  render: Object.assign(
    ({ children, ...args }: DropdownMenuRootProps) => {
      return (
        <DropdownMenuRoot {...args}>
          <>
            {DropdownTriggerBody}
            <DropdownMenuPortal>{children}</DropdownMenuPortal>
          </>
        </DropdownMenuRoot>
      )
    },
    {
      displayName: 'Dropdown'
    }
  )
}

export default meta

type Story = StoryObj<DropdownMenuRootProps>

export const Default: Story = {
  args: {
    children: <DropdownMenu>{DropdownMenuBody}</DropdownMenu>
  }
}

export const WithCustomTrigger: Story = {
  render: Object.assign(
    ({ ...args }: DropdownMenuRootProps) => {
      return (
        <DropdownMenuRoot {...args}>
          <>
            <DropdownMenuTrigger asChild>
              <Button label="Select a month" variant="ghost" />
            </DropdownMenuTrigger>
            <DropdownMenuPortal>
              <DropdownMenu>
                <DropdownMenuGroup>{DropdownMenuBody}</DropdownMenuGroup>
              </DropdownMenu>
            </DropdownMenuPortal>
          </>
        </DropdownMenuRoot>
      )
    },
    {
      displayName: 'Dropdown'
    }
  )
}

export const WithSelected: Story = {
  args: {
    children: (
      <DropdownMenu>
        <DropdownMenuGroup>{DropdownMenuBody}</DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem isSelected={true}>
          <DropdownMenuItemAdornment>
            <Icon name="check_circle" />
          </DropdownMenuItemAdornment>
          Status Bar
        </DropdownMenuItem>
      </DropdownMenu>
    )
  }
}
