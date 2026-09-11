import { render } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { axe } from 'vitest-axe'
import 'vitest-axe/extend-expect'

import { Divider } from '../Divider'

describe('Divider', () => {
  describe('accessibility', () => {
    describe('axe static tests', () => {
      test('default horizontal divider', async () => {
        const { container } = render(<Divider />)
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('vertical divider', async () => {
        const { container } = render(<Divider orientation="vertical" />)
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('custom thickness', async () => {
        const { container } = render(<Divider thickness={5} />)
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('custom color', async () => {
        const { container } = render(<Divider color="#ff0000" />)
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with custom class name', async () => {
        const { container } = render(<Divider className="custom-divider" />)
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with custom style', async () => {
        const { container } = render(<Divider style={{ margin: '20px 0' }} />)
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('vertical divider with custom thickness and color', async () => {
        const { container } = render(
          <Divider color="#0000ff" orientation="vertical" thickness={3} />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })
    })
  })
})
