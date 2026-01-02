import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'

import { Switch } from '../'

describe('Switch', () => {
  describe('accessibility > axe static tests', () => {
    it('default state', async () => {
      const { container } = render(
        <Switch
          aria-label="Toggle feature"
          id="test-switch"
          label="Enable feature"
        />
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('checked state', async () => {
      const { container } = render(
        <Switch
          aria-label="Toggle feature"
          checked
          id="test-switch"
          label="Enable feature"
          onChange={() => {}}
        />
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('disabled state', async () => {
      const { container } = render(
        <Switch
          aria-label="Toggle feature"
          id="test-switch"
          isDisabled
          label="Enable feature"
        />
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('required state', async () => {
      const { container } = render(
        <Switch
          aria-label="Toggle feature"
          id="test-switch"
          isRequired
          label="Enable feature"
        />
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('error state with helper text', async () => {
      const { container } = render(
        <Switch
          aria-label="Toggle feature"
          helperText="This field is required"
          id="test-switch"
          isError
          label="Enable feature"
        />
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('label placement start', async () => {
      const { container } = render(
        <Switch
          aria-label="Toggle feature"
          id="test-switch"
          label="Enable feature"
          labelPlacement="start"
        />
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('keyboard navigation', async () => {
      const user = userEvent.setup()
      const { container } = render(
        <Switch
          aria-label="Toggle feature"
          id="test-switch"
          label="Enable feature"
          onChange={() => {}}
        />
      )

      const switchButton = screen.getByRole('switch')

      await user.tab()
      expect(switchButton).toHaveFocus()

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('with custom colors', async () => {
      const { container } = render(
        <Switch
          aria-label="Toggle feature"
          id="test-switch"
          label="Enable feature"
          style={
            {
              '--concorde-switch-unchecked-color': '#999999',
              '--concorde-switch-unchecked-background-color': '#f5f5f5',
              '--concorde-switch-border-radius': '4px'
            } as React.CSSProperties
          }
        />
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })
  })
})
