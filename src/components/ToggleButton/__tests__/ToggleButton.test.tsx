import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'

import { ToggleButton } from '../'
import { Icon } from '../../Icon'

describe('ToggleButton', () => {
  describe('accessibility > axe static tests', () => {
    it('default state', async () => {
      const { container } = render(
        <ToggleButton
          aria-label="Toggle feature"
          id="test-toggle"
          label="Enable feature"
        />
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('pressed state', async () => {
      const { container } = render(
        <ToggleButton
          aria-label="Toggle feature"
          id="test-toggle"
          label="Enable feature"
          pressed
        />
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('disabled state', async () => {
      const { container } = render(
        <ToggleButton
          aria-label="Toggle feature"
          disabled
          id="test-toggle"
          label="Enable feature"
        />
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('with left icon', async () => {
      const { container } = render(
        <ToggleButton
          aria-label="Toggle feature"
          id="test-toggle"
          label="Enable feature"
          leftIcon={<Icon name="info" />}
        />
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('with right icon', async () => {
      const { container } = render(
        <ToggleButton
          aria-label="Toggle feature"
          id="test-toggle"
          label="Enable feature"
          rightIcon={<Icon name="close" />}
        />
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('with both icons', async () => {
      const { container } = render(
        <ToggleButton
          aria-label="Toggle feature"
          id="test-toggle"
          label="Enable feature"
          leftIcon={<Icon name="info" />}
          rightIcon={<Icon name="close" />}
        />
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('keyboard navigation', async () => {
      const user = userEvent.setup()
      const { container } = render(
        <ToggleButton
          aria-label="Toggle feature"
          id="test-toggle"
          label="Enable feature"
        />
      )

      const button = screen.getByRole('button')

      await user.tab()
      expect(button).toHaveFocus()

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('with custom colors', async () => {
      const { container } = render(
        <ToggleButton
          aria-label="Toggle feature"
          backgroundColor="#f5f5f5"
          color="#333333"
          hoverBgColor="#e0e0e0"
          id="test-toggle"
          label="Enable feature"
        />
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })
  })
})
