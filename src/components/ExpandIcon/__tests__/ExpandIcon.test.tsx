import { render } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { axe } from 'vitest-axe'
import 'vitest-axe/extend-expect'

import { ExpandIcon } from '../ExpandIcon'

describe('ExpandIcon', () => {
  describe('accessibility', () => {
    describe('axe static tests', () => {
      test('default collapsed state', async () => {
        const { container } = render(
          <ExpandIcon aria-label="Expand section" isExpanded={false} />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('expanded state', async () => {
        const { container } = render(
          <ExpandIcon aria-label="Collapse section" isExpanded={true} />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with custom class name', async () => {
        const { container } = render(
          <ExpandIcon
            aria-label="Expand section"
            className="custom-icon"
            isExpanded={false}
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with custom color', async () => {
        const { container } = render(
          <ExpandIcon
            aria-label="Expand section"
            color="#ff0000"
            isExpanded={false}
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with custom size', async () => {
        const { container } = render(
          <ExpandIcon
            aria-label="Expand section"
            isExpanded={false}
            size="24"
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with custom style', async () => {
        const { container } = render(
          <ExpandIcon
            aria-label="Expand section"
            isExpanded={false}
            style={{ margin: '8px' }}
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })
    })
  })
})
