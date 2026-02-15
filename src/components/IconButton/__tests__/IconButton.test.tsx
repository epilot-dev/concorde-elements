import { render } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { axe } from 'vitest-axe'
import 'vitest-axe/extend-expect'

import { IconButton } from '../IconButton'

describe('IconButton', () => {
  describe('accessibility', () => {
    describe('axe static tests', () => {
      test('default icon button', async () => {
        const { container } = render(
          <IconButton aria-label="Add item" name="add" />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('sharp variant', async () => {
        const { container } = render(
          <IconButton aria-label="Information" name="info" variant="sharp" />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('rounded variant', async () => {
        const { container } = render(
          <IconButton aria-label="Information" name="info" variant="rounded" />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('filled icon button', async () => {
        const { container } = render(
          <IconButton aria-label="Sell item" isFilled name="sell" />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with custom color', async () => {
        const { container } = render(
          <IconButton aria-label="Remove item" color="#ff0000" name="remove" />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with hover color', async () => {
        const { container } = render(
          <IconButton
            aria-label="Remove item"
            hoverColor="#00ff00"
            name="remove"
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with custom size', async () => {
        const { container } = render(
          <IconButton aria-label="Close" name="close" size="24px" />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('disabled state', async () => {
        const { container } = render(
          <IconButton aria-label="Add item" isDisabled name="add" />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with custom class names', async () => {
        const { container } = render(
          <IconButton
            aria-label="Add item"
            className="custom-button"
            iconClassName="custom-icon"
            name="add"
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with custom label', async () => {
        const { container } = render(
          <IconButton
            aria-label="Custom label"
            label={<span>Custom Label</span>}
            name="info"
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with different icon names', async () => {
        const { container } = render(
          <>
            <IconButton aria-label="Add" name="add" />
            <IconButton aria-label="Remove" name="remove" />
            <IconButton aria-label="Close" name="close" />
            <IconButton aria-label="Check" name="check" />
            <IconButton aria-label="More" name="expand_more" />
          </>
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with semantic colors', async () => {
        const { container } = render(
          <>
            <IconButton aria-label="Primary" color="primary" name="info" />
            <IconButton aria-label="Secondary" color="secondary" name="info" />
            <IconButton aria-label="Error" color="error" name="info" />
          </>
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })
    })
  })
})
