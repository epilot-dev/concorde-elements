import { render } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { axe } from 'vitest-axe'
import 'vitest-axe/extend-expect'

import { Card, Typography } from '../..'

function CardBody() {
  return (
    <>
      <Typography as="h2">Test card</Typography>
      <Typography>This is a test card description</Typography>
    </>
  )
}

describe('Card', () => {
  describe('accessibility', () => {
    describe('axe static tests', () => {
      test('regular card', async () => {
        const { container } = render(
          <Card>
            <CardBody />
          </Card>
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('card with custom background color', async () => {
        const { container } = render(
          <Card backgroundColor="#f5f5f5">
            <CardBody />
          </Card>
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })
    })
  })
})
