import { render } from '@testing-library/react'
import { axe } from 'vitest-axe'

import { Input } from '..'
import { Icon } from '../..'

describe('Input', () => {
  describe('accessibility', () => {
    describe('axe static tests', () => {
      test('default state', async () => {
        const { container } = render(
          <Input id="test-input" label="Test Input" placeholder="Enter text" />
        )

        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with helper text', async () => {
        const { container } = render(
          <Input
            helperText="This is a helper text"
            id="test-input"
            label="Test Input"
            placeholder="Enter text"
          />
        )

        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with error state', async () => {
        const { container } = render(
          <Input
            helperText="This field is required"
            id="test-input"
            isError
            label="Test Input"
            placeholder="Enter text"
          />
        )

        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with required state', async () => {
        const { container } = render(
          <Input
            id="test-input"
            isRequired
            label="Test Input"
            placeholder="Enter text"
          />
        )

        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with disabled state', async () => {
        const { container } = render(
          <Input
            id="test-input"
            isDisabled
            label="Test Input"
            placeholder="Enter text"
          />
        )

        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with start adornment', async () => {
        const { container } = render(
          <Input
            id="test-input"
            label="Test Input"
            placeholder="Enter text"
            startAdornment={<Icon name="info" />}
          />
        )

        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with end adornment', async () => {
        const { container } = render(
          <Input
            endAdornment={<Icon name="close" />}
            id="test-input"
            label="Test Input"
            placeholder="Enter text"
          />
        )

        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with both adornments', async () => {
        const { container } = render(
          <Input
            endAdornment={<Icon name="close" />}
            id="test-input"
            label="Test Input"
            placeholder="Enter text"
            startAdornment={<Icon name="info" />}
          />
        )

        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with filled variant', async () => {
        const { container } = render(
          <Input
            id="test-input"
            label="Test Input"
            placeholder="Enter text"
            variant="filled"
          />
        )

        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with custom colors', async () => {
        const { container } = render(
          <Input
            backgroundColor="#ffffff"
            borderColor="#cccccc"
            color="#ff0000"
            errorColor="#ff0000"
            id="test-input"
            label="Test Input"
            placeholder="Enter text"
          />
        )

        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with floating label', async () => {
        const { container } = render(
          <Input
            floatingLabel="kVA"
            id="test-input"
            label="Test Input"
            placeholder="Enter text"
          />
        )

        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })
    })
  })
})
