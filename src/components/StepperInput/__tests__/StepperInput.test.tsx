import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'
import '@testing-library/jest-dom'

import { StepperInput } from '../'

describe('StepperInput', () => {
  describe('accessibility > axe static tests', () => {
    it('default state', async () => {
      const { container } = render(
        <StepperInput id="quantity" label="Quantity" placeholder="0" />
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('required state', async () => {
      const { container } = render(
        <StepperInput
          id="quantity"
          isRequired
          label="Quantity"
          placeholder="0"
        />
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('disabled state', async () => {
      const { container } = render(
        <StepperInput
          id="quantity"
          isDisabled
          label="Quantity"
          placeholder="0"
        />
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('error state with helper text', async () => {
      const { container } = render(
        <StepperInput
          helperText="Please enter a valid number"
          id="quantity"
          isError
          label="Quantity"
          placeholder="0"
        />
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('full width mode', async () => {
      const { container } = render(
        <StepperInput
          id="quantity"
          isFullWidth
          label="Quantity"
          placeholder="0"
        />
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('custom colors', async () => {
      const { container } = render(
        <StepperInput
          borderColor="#ccc"
          errorColor="#ff0000"
          id="quantity"
          label="Quantity"
          placeholder="0"
        />
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('with custom adornment props', async () => {
      const { container } = render(
        <StepperInput
          adornmentProps={{
            'aria-label': 'Change quantity'
          }}
          id="quantity"
          label="Quantity"
          placeholder="0"
        />
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('with custom container props', async () => {
      const { container } = render(
        <StepperInput
          containerProps={{
            'aria-label': 'Quantity stepper'
          }}
          id="quantity"
          label="Quantity"
          placeholder="0"
        />
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('keyboard navigation', async () => {
      const user = userEvent.setup()
      const { container } = render(
        <StepperInput
          id="quantity"
          label="Quantity"
          onChange={() => {}}
          placeholder="0"
          value={5}
        />
      )

      const subtractButton = screen.getByRole('button', { name: 'Subtract' })
      const input = screen.getByRole('textbox')
      const addButton = screen.getByRole('button', { name: 'Add' })

      await user.tab()
      expect(subtractButton).toHaveFocus()

      await user.tab()
      expect(input).toHaveFocus()

      await user.tab()
      expect(addButton).toHaveFocus()

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })
  })
})
