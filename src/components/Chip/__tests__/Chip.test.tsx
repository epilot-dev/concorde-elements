import { render } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { Chip } from '../Chip'

describe('Chip', () => {
  describe('size', () => {
    // `Concorde-Chip--Small` is the public hook journeys' Custom CSS targets, so
    // it is asserted directly rather than through the hashed CSS module class.
    test('applies the small modifier class when size is small', () => {
      const { container } = render(<Chip size="small">This is a Chip</Chip>)

      expect(container.querySelector('.Concorde-Chip')).toHaveClass(
        'Concorde-Chip--Small'
      )
    })

    test('omits the small modifier class by default', () => {
      const { container } = render(<Chip>This is a Chip</Chip>)

      expect(container.querySelector('.Concorde-Chip')).not.toHaveClass(
        'Concorde-Chip--Small'
      )
    })

    // `size` is not a valid <div> attribute — leaving it in the rest spread
    // would forward it to the DOM and trip a React warning.
    test('does not forward size to the DOM', () => {
      const { container } = render(<Chip size="small">This is a Chip</Chip>)

      expect(container.querySelector('.Concorde-Chip')).not.toHaveAttribute(
        'size'
      )
    })
  })

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
