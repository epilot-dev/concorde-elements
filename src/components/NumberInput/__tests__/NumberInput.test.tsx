import { render } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { Icon, NumberInput } from '../..'

const noop = () => {}

describe('NumberInput', () => {
  describe('accessibility', () => {
    describe('axe static tests', () => {
      test('default', async () => {
        const { container } = render(
          <NumberInput
            id="test-id"
            label="Default"
            onChange={noop}
            placeholder="Enter anything..."
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('filled variant', async () => {
        const { container } = render(
          <NumberInput
            id="test-id"
            label="Default"
            onChange={noop}
            placeholder="Enter anything..."
            variant="filled"
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with value', async () => {
        const { container } = render(
          <NumberInput
            id="test-id"
            label="Default"
            onChange={noop}
            placeholder="Enter anything..."
            value="123"
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('required', async () => {
        const { container } = render(
          <NumberInput
            id="test-id"
            isRequired={true}
            label="Default"
            onChange={noop}
            placeholder="Enter anything..."
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with helper text', async () => {
        const { container } = render(
          <NumberInput
            helperText="This is a subtext"
            id="test-id"
            label="Default"
            onChange={noop}
            placeholder="Enter anything..."
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('error state', async () => {
        const { container } = render(
          <NumberInput
            helperText="This is an error subtext"
            id="test-id"
            isError={true}
            isRequired={true}
            label="Default"
            onChange={noop}
            placeholder="Enter anything..."
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('disabled state', async () => {
        const { container } = render(
          <NumberInput
            helperText="This is an error subtext"
            id="test-id"
            isDisabled={true}
            isError={true}
            isRequired={true}
            label="Default"
            onChange={noop}
            placeholder="Enter anything..."
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with left adornment', async () => {
        const { container } = render(
          <NumberInput
            id="test-id"
            label="Default"
            onChange={noop}
            placeholder="Enter anything..."
            startAdornment={<Icon name="info" />}
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with right adornment', async () => {
        const { container } = render(
          <NumberInput
            endAdornment={<Icon name="close" />}
            id="test-id"
            label="Default"
            onChange={noop}
            placeholder="Search"
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with both adornments', async () => {
        const { container } = render(
          <NumberInput
            endAdornment={<Icon name="close" />}
            id="test-id"
            label="Control"
            onChange={noop}
            placeholder="Search"
            startAdornment={<Icon name="info" />}
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with floating label', async () => {
        const { container } = render(
          <NumberInput
            endAdornment={<Icon name="close" />}
            floatingLabel="kVA"
            id="test-id"
            label="Number Input"
            onChange={noop}
            placeholder="0"
            startAdornment={<Icon name="info" />}
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('without thousand formatting', async () => {
        const { container } = render(
          <NumberInput
            floatingLabel="kVA"
            id="test-id"
            isFormattingEnabled={false}
            label="Number Input"
            onChange={noop}
            placeholder="0"
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })
    })
  })
})
