import { render } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { axe } from 'vitest-axe'
import 'vitest-axe/extend-expect'

import { Hidden } from '../Hidden'

describe('Hidden', () => {
  describe('accessibility', () => {
    describe('axe static tests', () => {
      test('hidden content', async () => {
        const { container } = render(
          <Hidden showChildren={false}>
            <div>Hidden content</div>
          </Hidden>
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('visible content', async () => {
        const { container } = render(
          <Hidden showChildren={true}>
            <div>Visible content</div>
          </Hidden>
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with complex content', async () => {
        const { container } = render(
          <Hidden showChildren={true}>
            <div aria-label="Complex content" role="region">
              <h2>Title</h2>
              <p>Some text</p>
              <button type="button">Click me</button>
            </div>
          </Hidden>
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with default showChildren value', async () => {
        const { container } = render(
          <Hidden>
            <div>Content with default visibility</div>
          </Hidden>
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })
    })
  })
})
