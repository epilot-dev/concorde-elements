import { render } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { CircularProgress } from '../CircularProgress'

describe('CircularProgress', () => {
  describe('accessibility', () => {
    describe('axe static tests', () => {
      test('default circular progress', async () => {
        const { container } = render(
          <CircularProgress aria-label="Loading..." />
        )

        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('circular progress with custom color', async () => {
        const { container } = render(
          <CircularProgress aria-label="Loading..." color="#0000ff" />
        )

        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('circular progress with custom size', async () => {
        const { container } = render(
          <CircularProgress aria-label="Loading..." size={48} />
        )

        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('circular progress with custom animation speed', async () => {
        const { container } = render(
          <CircularProgress aria-label="Loading..." speed="2s" />
        )

        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('circular progress with value', async () => {
        const { container } = render(
          <CircularProgress aria-label="Loading..." value={75} />
        )

        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('circular progress with variant', async () => {
        const { container } = render(
          <CircularProgress aria-label="Loading..." variant="secondary" />
        )

        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })
    })
  })
})
