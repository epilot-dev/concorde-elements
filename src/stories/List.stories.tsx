import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import {
  List,
  ListItem,
  ListItemAdornment,
  ListItemContent,
  Typography,
  Icon
} from '..'

function ListBody({
  index,
  hasStartAdornment,
  hasEndAdornment
}: {
  index: number
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
        <Typography>Feature {index + 1}</Typography>
      </ListItemContent>
      {hasEndAdornment && (
        <ListItemAdornment>
          <Icon name="close" />
        </ListItemAdornment>
      )}
    </ListItem>
  )
}

function ListBodyOrdered({
  index,
  hasStartAdornment,
  hasEndAdornment
}: {
  index: number
  hasStartAdornment?: boolean
  hasEndAdornment?: boolean
}) {
  return (
    <ListItem>
      {hasStartAdornment && <ListItemAdornment>{index + 1}.</ListItemAdornment>}
      <ListItemContent>
        <Typography>Feature</Typography>
      </ListItemContent>
      {hasEndAdornment && (
        <ListItemAdornment>
          <Icon name="close" />
        </ListItemAdornment>
      )}
    </ListItem>
  )
}
const meta: Meta<typeof List> = {
  title: 'Elements/List/List',
  component: List,
  parameters: {
    layout: 'centered'
  },
  argTypes: {
    children: { control: false },
    as: {
      control: 'select',
      options: ['ul', 'ol'],
      description:
        'html element that component will be rendered as.\n\nDefaults to the ul element'
    }
  }
}

export default meta

type Story = StoryObj<typeof List>

export const UnorderedList: Story = {
  args: {
    children: Array(2)
      .fill(0)
      .map((_, index) => (
        <ListBody hasStartAdornment index={index} key={index} />
      ))
  }
}

export const OrderedList: Story = {
  args: {
    as: 'ol',
    children: Array(2)
      .fill(0)
      .map((_, index) => (
        <ListBodyOrdered hasStartAdornment index={index} key={index} />
      ))
  }
}

export const AdornedList: Story = {
  args: {
    children: Array(2)
      .fill(0)
      .map((_, index) => (
        <ListBody hasEndAdornment hasStartAdornment index={index} key={index} />
      ))
  }
}
