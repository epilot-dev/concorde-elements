import { render } from '@testing-library/react'
import { axe } from 'vitest-axe'

import { Icon } from '../../Icon'
import { Menu } from '../Menu'
import { MenuItem, MenuItemAdornment, MenuItemContent } from '../MenuItem'
import type { MenuItemCSSProperties } from '../types'

describe('Menu', () => {
  describe('accessibility > axe static tests', () => {
    it('default menu', async () => {
      const { container } = render(
        <Menu aria-label="Select an option">
          <MenuItem>
            <MenuItemContent>Item 1</MenuItemContent>
          </MenuItem>
          <MenuItem>
            <MenuItemContent>Item 2</MenuItemContent>
          </MenuItem>
        </Menu>
      )

      const results = await axe(container as HTMLElement)

      expect(results).toHaveNoViolations()
    })

    it('with selected items', async () => {
      const { container } = render(
        <Menu aria-label="Select an option">
          <MenuItem isSelected>
            <MenuItemAdornment>
              <Icon aria-label="Selected" name="check" />
            </MenuItemAdornment>
            <MenuItemContent>Item 1</MenuItemContent>
          </MenuItem>
          <MenuItem>
            <MenuItemContent>Item 2</MenuItemContent>
          </MenuItem>
        </Menu>
      )

      const results = await axe(container as HTMLElement)

      expect(results).toHaveNoViolations()
    })

    it('with disabled items', async () => {
      const { container } = render(
        <Menu aria-label="Select an option">
          <MenuItem isDisabled>
            <MenuItemContent>Item 1</MenuItemContent>
          </MenuItem>
          <MenuItem>
            <MenuItemContent>Item 2</MenuItemContent>
          </MenuItem>
        </Menu>
      )

      const results = await axe(container as HTMLElement)

      expect(results).toHaveNoViolations()
    })

    it('with clickable items', async () => {
      const { container } = render(
        <Menu aria-label="Select an option">
          <MenuItem onClick={() => {}} tabIndex={0}>
            <MenuItemContent>Item 1</MenuItemContent>
          </MenuItem>
          <MenuItem onClick={() => {}} tabIndex={-1}>
            <MenuItemContent>Item 2</MenuItemContent>
          </MenuItem>
        </Menu>
      )

      const results = await axe(container as HTMLElement)

      expect(results).toHaveNoViolations()
    })

    it('with start adornments', async () => {
      const { container } = render(
        <Menu aria-label="Select an option">
          <MenuItem>
            <MenuItemAdornment>
              <Icon aria-label="Completed" name="check_circle" />
            </MenuItemAdornment>
            <MenuItemContent>Item 1</MenuItemContent>
          </MenuItem>
          <MenuItem>
            <MenuItemAdornment>
              <Icon aria-label="Completed" name="check_circle" />
            </MenuItemAdornment>
            <MenuItemContent>Item 2</MenuItemContent>
          </MenuItem>
        </Menu>
      )

      const results = await axe(container as HTMLElement)

      expect(results).toHaveNoViolations()
    })

    it('with end adornments', async () => {
      const { container } = render(
        <Menu aria-label="Select an option">
          <MenuItem>
            <MenuItemContent>Item 1</MenuItemContent>
            <MenuItemAdornment>
              <Icon aria-label="Remove" name="close" />
            </MenuItemAdornment>
          </MenuItem>
          <MenuItem>
            <MenuItemContent>Item 2</MenuItemContent>
            <MenuItemAdornment>
              <Icon aria-label="Remove" name="close" />
            </MenuItemAdornment>
          </MenuItem>
        </Menu>
      )

      const results = await axe(container as HTMLElement)

      expect(results).toHaveNoViolations()
    })

    it('with custom colors', async () => {
      const { container } = render(
        <Menu
          aria-label="Select an option"
          hoverBgColor="#100f11"
          hoverColor="#a0f6cc"
          selectedBgColor="#5447ec"
          selectedColor="#f4f4f4"
          style={
            {
              '--concorde-menu-bg-color': '#ffffff'
            } as MenuItemCSSProperties
          }
        >
          <MenuItem>
            <MenuItemContent>Item 1</MenuItemContent>
          </MenuItem>
          <MenuItem>
            <MenuItemContent>Item 2</MenuItemContent>
          </MenuItem>
        </Menu>
      )

      const results = await axe(container as HTMLElement)

      expect(results).toHaveNoViolations()
    })

    it('with keyboard navigation', async () => {
      const { container } = render(
        <Menu aria-label="Select an option">
          <MenuItem role="option" tabIndex={0}>
            <MenuItemContent>Item 1</MenuItemContent>
          </MenuItem>
          <MenuItem role="option" tabIndex={-1}>
            <MenuItemContent>Item 2</MenuItemContent>
          </MenuItem>
        </Menu>
      )

      const results = await axe(container as HTMLElement)

      expect(results).toHaveNoViolations()
    })

    it('with aria-labelledby', async () => {
      const { container } = render(
        <>
          <div id="menu-label">Choose an option</div>
          <Menu aria-labelledby="menu-label">
            <MenuItem>
              <MenuItemContent>Item 1</MenuItemContent>
            </MenuItem>
            <MenuItem>
              <MenuItemContent>Item 2</MenuItemContent>
            </MenuItem>
          </Menu>
        </>
      )

      const results = await axe(container as HTMLElement)

      expect(results).toHaveNoViolations()
    })
  })
})
