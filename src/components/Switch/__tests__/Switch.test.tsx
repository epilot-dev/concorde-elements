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

  describe('accessible name', () => {
    it('associates the visible label with the switch via aria-labelledby', () => {
      render(<Switch id="test-switch" label="Enable feature" />)

      const switchButton = screen.getByRole('switch')
      const labelId = switchButton.getAttribute('aria-labelledby')

      expect(labelId).toBeTruthy()
      expect(document.getElementById(labelId as string)).toHaveTextContent(
        'Enable feature'
      )
      expect(switchButton).toHaveAccessibleName('Enable feature')
    })

    it('derives a stable label id even without an explicit id', () => {
      render(<Switch label="Enable feature" />)

      expect(screen.getByRole('switch')).toHaveAccessibleName('Enable feature')
    })

    it('prefers a consumer-provided aria-label over the visible label', () => {
      render(<Switch aria-label="Toggle feature" id="s" label="Visible" />)

      const switchButton = screen.getByRole('switch')

      expect(switchButton).not.toHaveAttribute('aria-labelledby')
      expect(switchButton).toHaveAccessibleName('Toggle feature')
    })

    it('respects a consumer-provided aria-labelledby', () => {
      render(
        <>
          <span id="external-label">External label</span>
          <Switch aria-labelledby="external-label" id="s" label="Visible" />
        </>
      )

      const switchButton = screen.getByRole('switch')

      expect(switchButton).toHaveAttribute('aria-labelledby', 'external-label')
      expect(switchButton).toHaveAccessibleName('External label')
    })

    it('does not set aria-labelledby when there is no label', () => {
      render(<Switch aria-label="Toggle feature" id="s" />)

      expect(screen.getByRole('switch')).not.toHaveAttribute('aria-labelledby')
    })
  })
})
