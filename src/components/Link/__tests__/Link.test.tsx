import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
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

  describe('as a button', () => {
    it('renders a button that carries the link class', () => {
      render(
        <Link as="button" onClick={vi.fn()}>
          Undo
        </Link>
      )

      const button = screen.getByRole('button', { name: 'Undo' })

      expect(button).toHaveAttribute('type', 'button')
      expect(button).toHaveClass('Concorde-Link')
      expect(button).not.toHaveAttribute('as')
    })

    it.each([
      ['Enter', '{Enter}'],
      ['Space', ' ']
    ])('is reached with Tab and activated with %s', async (_key, keys) => {
      const onClick = vi.fn()

      render(
        <p>
          You can continue.{' '}
          <Link as="button" onClick={onClick}>
            Undo
          </Link>
        </p>
      )

      await userEvent.tab()

      expect(screen.getByRole('button', { name: 'Undo' })).toHaveFocus()

      await userEvent.keyboard(keys)

      expect(onClick).toHaveBeenCalledTimes(1)
    })

    it('stays reachable but inert while disabled', async () => {
      const onClick = vi.fn()

      render(
        <Link as="button" isDisabled onClick={onClick}>
          Undo
        </Link>
      )

      await userEvent.tab()

      const button = screen.getByRole('button', { name: 'Undo' })

      expect(button).toHaveFocus()
      expect(button).toHaveAttribute('aria-disabled', 'true')

      await userEvent.keyboard('{Enter}')

      expect(onClick).not.toHaveBeenCalled()
    })

    it('has no accessibility violations inside a sentence', async () => {
      const { container } = render(
        <p>
          You can continue.{' '}
          <Link as="button" onClick={vi.fn()}>
            Undo
          </Link>
        </p>
      )

      const results = await axe(container as HTMLElement)

      expect(results).toHaveNoViolations()
    })
  })
})
