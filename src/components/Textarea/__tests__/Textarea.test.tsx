import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'

import { Textarea } from '../../../components/Input'

describe('Textarea', () => {
  describe('accessibility > axe static tests', () => {
    it('default state', async () => {
      const { container } = render(
        <Textarea
          aria-label="Message"
          id="test-textarea"
          label="Enter your message"
          placeholder="Type your message here..."
        />
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('with value', async () => {
      const { container } = render(
        <Textarea
          aria-label="Message"
          defaultValue="Hello world"
          id="test-textarea"
          label="Enter your message"
        />
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('disabled state', async () => {
      const { container } = render(
        <Textarea
          aria-label="Message"
          id="test-textarea"
          isDisabled
          label="Enter your message"
        />
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('required state', async () => {
      const { container } = render(
        <Textarea
          aria-label="Message"
          id="test-textarea"
          isRequired
          label="Enter your message"
        />
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('error state with helper text', async () => {
      const { container } = render(
        <Textarea
          aria-label="Message"
          helperText="This field is required"
          id="test-textarea"
          isError
          label="Enter your message"
        />
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('with adornments', async () => {
      const { container } = render(
        <Textarea
          aria-label="Message"
          endAdornment={<div>chars: 0/100</div>}
          id="test-textarea"
          label="Enter your message"
          startAdornment={<div>📝</div>}
        />
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('keyboard navigation', async () => {
      const user = userEvent.setup()
      const { container } = render(
        <Textarea
          aria-label="Message"
          id="test-textarea"
          label="Enter your message"
        />
      )

      const textarea = screen.getByRole('textbox')

      await user.tab()
      expect(textarea).toHaveFocus()

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('with custom colors', async () => {
      const { container } = render(
        <Textarea
          aria-label="Message"
          backgroundColor="#f5f5f5"
          borderColor="#999999"
          color="#333333"
          id="test-textarea"
          label="Enter your message"
        />
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })
  })
})
