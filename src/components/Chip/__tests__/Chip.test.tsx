import { render } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { Chip } from '../Chip'

describe('Chip', () => {
  describe('accessibility', () => {
    describe('axe static tests', () => {
      test('default chip', async () => {
        const { container } = render(<Chip>This is a Chip</Chip>)

        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('chip with left icon', async () => {
        const { container } = render(
          <Chip leftIcon="check">This is a Chip</Chip>
        )

        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('chip with custom background color', async () => {
        const { container } = render(
          <Chip backgroundColor="#f0f0f0">This is a Chip</Chip>
        )

        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('chip with hover background color', async () => {
        const { container } = render(
          <Chip hoverBgColor="#e0e0e0">This is a Chip</Chip>
        )

        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('chip with delete handler', async () => {
        const { container } = render(
          <Chip deleteAriaLabel="Delete chip" onDelete={() => {}}>
            This is a Chip
          </Chip>
        )

        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('chip with custom class name', async () => {
        const { container } = render(
          <Chip className="custom-chip">This is a Chip</Chip>
        )

        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })
    })
  })
})
