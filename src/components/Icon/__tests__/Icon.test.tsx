import { render } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { axe } from 'vitest-axe'
import 'vitest-axe/extend-expect'

import { Icon } from '../Icon'

describe('Icon', () => {
  describe('accessibility', () => {
    describe('axe static tests', () => {
      test('default icon', async () => {
        const { container } = render(<Icon name="info" />)
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('sharp variant', async () => {
        const { container } = render(<Icon name="info" variant="sharp" />)
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('rounded variant', async () => {
        const { container } = render(<Icon name="info" variant="rounded" />)
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('filled icon', async () => {
        const { container } = render(<Icon isFilled name="info" />)
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with custom color', async () => {
        const { container } = render(<Icon color="#ff0000" name="info" />)
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with hover color', async () => {
        const { container } = render(<Icon hoverColor="#00ff00" name="info" />)
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with custom size', async () => {
        const { container } = render(<Icon name="info" size="24px" />)
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with custom class name', async () => {
        const { container } = render(
          <Icon className="custom-icon" name="info" />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with custom style', async () => {
        const { container } = render(
          <Icon name="info" style={{ margin: '8px' }} />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with different icon names', async () => {
        const { container } = render(
          <>
            <Icon name="add" />
            <Icon name="remove" />
            <Icon name="close" />
            <Icon name="check" />
            <Icon name="expand_more" />
          </>
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with semantic colors', async () => {
        const { container } = render(
          <>
            <Icon color="primary" name="info" />
            <Icon color="secondary" name="info" />
            <Icon color="error" name="info" />
          </>
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })
    })
  })
})
