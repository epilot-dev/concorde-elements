import { render, screen } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { Checkbox } from '../Checkbox'

describe('Checkbox', () => {
  describe('accessibility', () => {
    describe('axe static tests', () => {
      test('default checkbox', async () => {
        const { container } = render(
          <Checkbox id="test-checkbox" label="Test Checkbox" />
        )

        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()

        const checkbox = screen.getByRole('checkbox')

        expect(checkbox).toHaveAttribute(
          'aria-labelledby',
          'test-checkbox-label'
        )

        const label = screen.getByText('Test Checkbox')

        expect(label).toHaveAttribute('id', 'test-checkbox-label')
      })

      test('checked checkbox', async () => {
        const { container } = render(
          <Checkbox checked id="test-checkbox" label="Test Checkbox" />
        )

        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('disabled checkbox', async () => {
        const { container } = render(
          <Checkbox id="test-checkbox" isDisabled label="Test Checkbox" />
        )

        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('required checkbox', async () => {
        const { container } = render(
          <Checkbox id="test-checkbox" isRequired label="Test Checkbox" />
        )

        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()

        const checkbox = screen.getByRole('checkbox')

        expect(checkbox).toHaveAttribute('aria-required', 'true')
      })

      test('error state checkbox', async () => {
        const { container } = render(
          <Checkbox id="test-checkbox" isError label="Test Checkbox" />
        )

        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()

        const checkbox = screen.getByRole('checkbox')

        expect(checkbox).toHaveAttribute('aria-invalid', 'true')
      })

      test('checkbox with label placement start', async () => {
        const { container } = render(
          <Checkbox
            id="test-checkbox"
            label="Test Checkbox"
            labelPlacement="start"
          />
        )

        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('checkbox without explicit id', async () => {
        const { container } = render(<Checkbox label="Test Checkbox" />)

        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()

        const checkbox = screen.getByRole('checkbox')

        expect(checkbox).toHaveAttribute('aria-labelledby')

        const label = screen.getByText('Test Checkbox')

        expect(label).toHaveAttribute('id')
        expect(checkbox.getAttribute('aria-labelledby')).toBe(
          label.getAttribute('id')
        )
      })
    })
  })
})
