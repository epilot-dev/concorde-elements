import { render } from '@testing-library/react'
import { axe } from 'vitest-axe'

import { LinearProgress } from '../LinearProgress'
import type { LinearProgressCSSProperties } from '../types'

describe('LinearProgress', () => {
  describe('accessibility > axe static tests', () => {
    it('default state', async () => {
      const { container } = render(
        <LinearProgress aria-label="Loading progress" value={50} />
      )

      const results = await axe(container as HTMLElement)

      expect(results).toHaveNoViolations()
    })

    it('with custom height', async () => {
      const { container } = render(
        <LinearProgress aria-label="Loading progress" height={8} value={50} />
      )

      const results = await axe(container as HTMLElement)

      expect(results).toHaveNoViolations()
    })

    it('with custom max value', async () => {
      const { container } = render(
        <LinearProgress aria-label="Loading progress" max={50} value={25} />
      )

      const results = await axe(container as HTMLElement)

      expect(results).toHaveNoViolations()
    })

    it('with zero value', async () => {
      const { container } = render(
        <LinearProgress aria-label="Loading progress" value={0} />
      )

      const results = await axe(container as HTMLElement)

      expect(results).toHaveNoViolations()
    })

    it('with full value', async () => {
      const { container } = render(
        <LinearProgress aria-label="Loading progress" value={100} />
      )

      const results = await axe(container as HTMLElement)

      expect(results).toHaveNoViolations()
    })

    it('with custom class name', async () => {
      const { container } = render(
        <LinearProgress
          aria-label="Loading progress"
          className="custom-progress"
          value={50}
        />
      )

      const results = await axe(container as HTMLElement)

      expect(results).toHaveNoViolations()
    })

    it('with custom style', async () => {
      const { container } = render(
        <LinearProgress
          aria-label="Loading progress"
          style={
            {
              '--concorde-linear-progress-background-color': '#cccccc'
            } as LinearProgressCSSProperties
          }
          value={50}
        />
      )

      const results = await axe(container as HTMLElement)

      expect(results).toHaveNoViolations()
    })

    it('with custom indicator props', async () => {
      const { container } = render(
        <LinearProgress
          aria-label="Loading progress"
          indicatorProps={{
            className: 'custom-indicator'
          }}
          value={50}
        />
      )

      const results = await axe(container as HTMLElement)

      expect(results).toHaveNoViolations()
    })
  })
})
