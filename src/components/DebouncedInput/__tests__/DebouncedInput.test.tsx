import { render } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { axe } from 'vitest-axe'
import 'vitest-axe/extend-expect'

import { DebouncedInput } from '../DebouncedInput'

const noop = () => {}

describe('DebouncedInput', () => {
  describe('accessibility', () => {
    describe('axe static tests', () => {
      test('default input', async () => {
        const { container } = render(
          <DebouncedInput
            id="test-id"
            label="Default Input"
            onChange={noop}
            value=""
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('number input', async () => {
        const { container } = render(
          <DebouncedInput
            id="test-id"
            isNumberInput
            label="Number Input"
            onChange={noop}
            value=""
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('disabled state', async () => {
        const { container } = render(
          <DebouncedInput
            id="test-id"
            isDisabled
            label="Disabled Input"
            onChange={noop}
            value=""
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with helper text', async () => {
        const { container } = render(
          <DebouncedInput
            helperText="Helper text"
            id="test-id"
            label="Input with Helper"
            onChange={noop}
            value=""
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('error state', async () => {
        const { container } = render(
          <DebouncedInput
            id="test-id"
            isError
            label="Error Input"
            onChange={noop}
            value=""
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with adornments', async () => {
        const { container } = render(
          <DebouncedInput
            endAdornment={<span>End</span>}
            id="test-id"
            label="Input with Adornments"
            onChange={noop}
            startAdornment={<span>Start</span>}
            value=""
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('required input', async () => {
        const { container } = render(
          <DebouncedInput
            id="test-id"
            isRequired
            label="Required Input"
            onChange={noop}
            value=""
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('number input with formatting', async () => {
        const { container } = render(
          <DebouncedInput
            id="test-id"
            isFormattingEnabled
            isNumberInput
            label="Formatted Number Input"
            onChange={noop}
            value="1234.56"
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })
    })
  })
})
