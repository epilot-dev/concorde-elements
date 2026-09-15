import { render } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { axe } from 'vitest-axe'
import 'vitest-axe/extend-expect'

import { DottedLine } from '../DottedLine'

describe('DottedLine', () => {
  describe('accessibility', () => {
    describe('axe static tests', () => {
      test('default dotted line', async () => {
        const { container } = render(<DottedLine />)
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with custom color', async () => {
        const { container } = render(<DottedLine color="#ff0000" />)
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with custom class name', async () => {
        const { container } = render(<DottedLine className="custom-line" />)
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with custom style', async () => {
        const { container } = render(
          <DottedLine style={{ margin: '20px 0' }} />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with aria-hidden', async () => {
        const { container } = render(<DottedLine aria-hidden="true" />)
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with custom color and style', async () => {
        const { container } = render(
          <DottedLine
            color="#0000ff"
            style={{ margin: '10px 0', width: '200px' }}
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })
    })
  })
})
