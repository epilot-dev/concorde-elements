import { render } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { axe } from 'vitest-axe'
import 'vitest-axe/extend-expect'

import { Badge, Icon } from '../..'

describe('Badge', () => {
  describe('accessibility', () => {
    describe('axe static tests', () => {
      test('default badge', async () => {
        const { container } = render(
          <Badge
            aria-label="This is a Badge"
            badgeContent="5"
            title="This is a Badge"
          >
            <Icon isFilled name="shopping_cart" />
          </Badge>
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('primary variant', async () => {
        const { container } = render(
          <Badge
            aria-label="This is a Badge"
            badgeContent="5"
            title="This is a Badge"
            variant="primary"
          >
            <Icon isFilled name="shopping_cart" />
          </Badge>
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('secondary variant', async () => {
        const { container } = render(
          <Badge
            aria-label="This is a Badge"
            badgeContent="5"
            title="This is a Badge"
            variant="secondary"
          >
            <Icon isFilled name="info" />
          </Badge>
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('error variant', async () => {
        const { container } = render(
          <Badge
            aria-label="This is a Badge"
            badgeContent="!!"
            title="This is a Badge"
            variant="error"
          >
            😅
          </Badge>
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('invisible badge', async () => {
        const { container } = render(
          <Badge
            invisible
            slotProps={{
              root: {
                role: 'status',
                'aria-label': 'This is a Badge',
                title: 'This is a Badge'
              }
            }}
            slots={{ root: 'div' }}
          >
            42
          </Badge>
        )

        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with max value', async () => {
        const { container } = render(
          <Badge
            aria-label="This is a Badge"
            badgeContent="100"
            max={99}
            title="This is a Badge"
          >
            <Icon isFilled name="shopping_cart" />
          </Badge>
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('show zero', async () => {
        const { container } = render(
          <Badge
            aria-label="This is a Badge"
            badgeContent="0"
            showZero={true}
            title="This is a Badge"
          >
            <Icon isFilled name="shopping_cart" />
          </Badge>
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })
    })
  })
})
