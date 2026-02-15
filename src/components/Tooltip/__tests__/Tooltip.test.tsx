import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'

import { Tooltip } from '../'
import { Button } from '../../Button'
import { Typography } from '../../Typography'

vi.mock('../../StyleInjectionProvider', () => ({
  useStyleInjection: () => ({
    getStyleContainer: () => document.head,
    getPortalContainer: () => undefined
  })
}))

describe('Tooltip', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('accessibility > axe static tests', () => {
    it('default state', async () => {
      const { container } = render(
        <Tooltip title="Helpful information">
          <Button aria-label="Help" label="Help" />
        </Tooltip>
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('with arrow', async () => {
      const { container } = render(
        <Tooltip arrow title="Helpful information">
          <Button aria-label="Help" label="Help" />
        </Tooltip>
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('without arrow', async () => {
      const { container } = render(
        <Tooltip arrow={false} title="Helpful information">
          <Button aria-label="Help" label="Help" />
        </Tooltip>
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('with placement top', async () => {
      const { container } = render(
        <Tooltip placement="top" title="Helpful information">
          <Button aria-label="Help" label="Help" />
        </Tooltip>
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('with placement right', async () => {
      const { container } = render(
        <Tooltip placement="right" title="Helpful information">
          <Button aria-label="Help" label="Help" />
        </Tooltip>
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('with placement bottom', async () => {
      const { container } = render(
        <Tooltip placement="bottom" title="Helpful information">
          <Button aria-label="Help" label="Help" />
        </Tooltip>
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('with placement left', async () => {
      const { container } = render(
        <Tooltip placement="left" title="Helpful information">
          <Button aria-label="Help" label="Help" />
        </Tooltip>
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('with custom content', async () => {
      const { container } = render(
        <Tooltip
          title={
            <Typography as="p" color="white">
              This is a custom tooltip content
            </Typography>
          }
        >
          <Button aria-label="Help" label="Help" />
        </Tooltip>
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('keyboard navigation', async () => {
      const user = userEvent.setup()
      const { container } = render(
        <Tooltip title="Helpful information">
          <Button aria-label="Help" label="Help" />
        </Tooltip>
      )

      const button = screen.getByRole('button')

      await user.tab()
      expect(button).toHaveFocus()

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })
  })
})
