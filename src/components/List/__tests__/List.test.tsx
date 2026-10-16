import { render } from '@testing-library/react'
import { axe } from 'vitest-axe'

import { Icon } from '../../Icon'
import { List, ListItem, ListItemAdornment, ListItemContent } from '../List'
import type { ListItemCSSProperties } from '../types'

describe('List', () => {
  describe('accessibility > axe static tests', () => {
    it('unordered list', async () => {
      const { container } = render(
        <List>
          <ListItem>
            <ListItemContent>Item 1</ListItemContent>
          </ListItem>
          <ListItem>
            <ListItemContent>Item 2</ListItemContent>
          </ListItem>
        </List>
      )

      const results = await axe(container as HTMLElement)

      expect(results).toHaveNoViolations()
    })

    it('ordered list', async () => {
      const { container } = render(
        <List as="ol">
          <ListItem>
            <ListItemContent>Item 1</ListItemContent>
          </ListItem>
          <ListItem>
            <ListItemContent>Item 2</ListItemContent>
          </ListItem>
        </List>
      )

      const results = await axe(container as HTMLElement)

      expect(results).toHaveNoViolations()
    })

    it('with start adornments', async () => {
      const { container } = render(
        <List>
          <ListItem>
            <ListItemAdornment>
              <Icon aria-label="Completed" name="check_circle" />
            </ListItemAdornment>
            <ListItemContent>Item 1</ListItemContent>
          </ListItem>
          <ListItem>
            <ListItemAdornment>
              <Icon aria-label="Completed" name="check_circle" />
            </ListItemAdornment>
            <ListItemContent>Item 2</ListItemContent>
          </ListItem>
        </List>
      )

      const results = await axe(container as HTMLElement)

      expect(results).toHaveNoViolations()
    })

    it('with end adornments', async () => {
      const { container } = render(
        <List>
          <ListItem>
            <ListItemContent>Item 1</ListItemContent>
            <ListItemAdornment>
              <Icon aria-label="Remove" name="close" />
            </ListItemAdornment>
          </ListItem>
          <ListItem>
            <ListItemContent>Item 2</ListItemContent>
            <ListItemAdornment>
              <Icon aria-label="Remove" name="close" />
            </ListItemAdornment>
          </ListItem>
        </List>
      )

      const results = await axe(container as HTMLElement)

      expect(results).toHaveNoViolations()
    })

    it('with clickable items', async () => {
      const { container } = render(
        <List aria-label="Select an item" role="listbox">
          <ListItem onClick={() => {}} role="option" tabIndex={0}>
            <ListItemContent>Item 1</ListItemContent>
          </ListItem>
          <ListItem onClick={() => {}} role="option" tabIndex={-1}>
            <ListItemContent>Item 2</ListItemContent>
          </ListItem>
        </List>
      )

      const results = await axe(container as HTMLElement)

      expect(results).toHaveNoViolations()
    })

    it('with selected items', async () => {
      const { container } = render(
        <List aria-label="Select an item" role="listbox">
          <ListItem aria-selected={true} isSelected role="option">
            <ListItemContent>Item 1</ListItemContent>
          </ListItem>
          <ListItem role="option">
            <ListItemContent>Item 2</ListItemContent>
          </ListItem>
        </List>
      )

      const results = await axe(container as HTMLElement)

      expect(results).toHaveNoViolations()
    })

    it('with disabled items', async () => {
      const { container } = render(
        <List>
          <ListItem aria-disabled={true} isDisabled>
            <ListItemContent>Item 1</ListItemContent>
          </ListItem>
          <ListItem>
            <ListItemContent>Item 2</ListItemContent>
          </ListItem>
        </List>
      )

      const results = await axe(container as HTMLElement)

      expect(results).toHaveNoViolations()
    })

    it('with custom styles', async () => {
      const { container } = render(
        <List>
          <ListItem
            style={
              {
                '--concorde-list-item-hover-color': '#ff0000',
                '--concorde-list-item-hover-background-color': '#f4dbdb'
              } as ListItemCSSProperties
            }
          >
            <ListItemContent>Item 1</ListItemContent>
          </ListItem>
          <ListItem>
            <ListItemContent>Item 2</ListItemContent>
          </ListItem>
        </List>
      )

      const results = await axe(container as HTMLElement)

      expect(results).toHaveNoViolations()
    })

    it('with keyboard navigation', async () => {
      const { container } = render(
        <List aria-label="Select an item" role="listbox">
          <ListItem role="option" tabIndex={0}>
            <ListItemContent>Item 1</ListItemContent>
          </ListItem>
          <ListItem role="option" tabIndex={-1}>
            <ListItemContent>Item 2</ListItemContent>
          </ListItem>
        </List>
      )

      const results = await axe(container as HTMLElement)

      expect(results).toHaveNoViolations()
    })
  })
})
