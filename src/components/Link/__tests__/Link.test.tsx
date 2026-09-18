import { render } from '@testing-library/react'
import { axe } from 'vitest-axe'

import { Icon } from '../../Icon'
import { Link } from '../Link'
import type { LinkCSSProperties } from '../types'

describe('Link', () => {
  describe('accessibility > axe static tests', () => {
    it('default state', async () => {
      const { container } = render(
        <Link href="/" rel="noopener noreferrer" target="_blank">
          Test link
        </Link>
      )

      const results = await axe(container as HTMLElement)

      expect(results).toHaveNoViolations()
    })

    it('with disabled state', async () => {
      const { container } = render(
        <Link href="/" isDisabled>
          Test link
        </Link>
      )

      const results = await axe(container as HTMLElement)

      expect(results).toHaveNoViolations()
    })

    it('with custom colors', async () => {
      const { container } = render(
        <Link color="red" hoverColor="darkred" href="/">
          Test link
        </Link>
      )

      const results = await axe(container as HTMLElement)

      expect(results).toHaveNoViolations()
    })

    it('with custom class name', async () => {
      const { container } = render(
        <Link className="custom-link" href="/">
          Test link
        </Link>
      )

      const results = await axe(container as HTMLElement)

      expect(results).toHaveNoViolations()
    })

    it('with custom style', async () => {
      const { container } = render(
        <Link
          href="/"
          style={
            {
              '--concorde-link-color': '#ff0000',
              '--concorde-link-hover-color': '#990000'
            } as LinkCSSProperties
          }
        >
          Test link
        </Link>
      )

      const results = await axe(container as HTMLElement)

      expect(results).toHaveNoViolations()
    })

    it('with icon content', async () => {
      const { container } = render(
        <Link href="/">
          <Icon aria-label="Information" name="info" /> Learn more
        </Link>
      )

      const results = await axe(container as HTMLElement)

      expect(results).toHaveNoViolations()
    })

    it('with aria-label', async () => {
      const { container } = render(
        <Link aria-label="Learn more about our services" href="/">
          Learn more
        </Link>
      )

      const results = await axe(container as HTMLElement)

      expect(results).toHaveNoViolations()
    })

    it('with aria-describedby', async () => {
      const { container } = render(
        <>
          <div id="link-description">
            Click here to learn more about our services
          </div>
          <Link aria-describedby="link-description" href="/">
            Learn more
          </Link>
        </>
      )

      const results = await axe(container as HTMLElement)

      expect(results).toHaveNoViolations()
    })
  })
})
