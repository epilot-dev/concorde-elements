import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'
import { axe } from 'vitest-axe'
import 'vitest-axe/extend-expect'

import { Icon, ToggleGroup, ToggleGroupItem } from '../..'

describe('ToggleGroup', () => {
  describe('accessibility', () => {
    describe('axe static tests', () => {
      test('default single select', async () => {
        const { container } = render(
          <ToggleGroup
            aria-label="Salutations"
            defaultValue="Mr."
            type="single"
          >
            <ToggleGroupItem aria-label="Mr." label="Mr." value="Mr." />
            <ToggleGroupItem
              aria-label="Ms. / Mrs."
              label="Ms. / Mrs."
              value="Ms. / Mrs."
            />
            <ToggleGroupItem aria-label="Other" label="Other" value="Other" />
          </ToggleGroup>
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('multiple select', async () => {
        const { container } = render(
          <ToggleGroup
            aria-label="Letters of the alphabet"
            defaultValue={['A', 'B']}
            type="multiple"
          >
            <ToggleGroupItem aria-label="First letter" label="A" value="A" />
            <ToggleGroupItem aria-label="Second letter" label="B" value="B" />
            <ToggleGroupItem aria-label="Third letter" label="C" value="C" />
          </ToggleGroup>
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('required', async () => {
        const { container } = render(
          <ToggleGroup
            aria-label="Letters of the alphabet"
            defaultValue="A"
            isRequired={true}
            type="single"
          >
            <ToggleGroupItem aria-label="First letter" label="A" value="A" />
            <ToggleGroupItem aria-label="Second letter" label="B" value="B" />
            <ToggleGroupItem aria-label="Third letter" label="C" value="C" />
          </ToggleGroup>
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('disabled', async () => {
        const { container } = render(
          <ToggleGroup
            aria-label="Letters of the alphabet"
            defaultValue="A"
            disabled={true}
            type="single"
          >
            <ToggleGroupItem
              aria-label="First letter"
              label="A"
              leftIcon={<Icon name="info" />}
              value="A"
            />
            <ToggleGroupItem aria-label="Second letter" label="B" value="B" />
            <ToggleGroupItem aria-label="Third letter" label="C" value="C" />
          </ToggleGroup>
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with error', async () => {
        const { container } = render(
          <ToggleGroup
            aria-label="Letters of the alphabet"
            defaultValue="A"
            error="Please select a letter"
            type="single"
          >
            <ToggleGroupItem
              aria-label="First letter"
              label="A"
              leftIcon={<Icon name="info" />}
              value="A"
            />
            <ToggleGroupItem aria-label="Second letter" label="B" value="B" />
            <ToggleGroupItem aria-label="Third letter" label="C" value="C" />
          </ToggleGroup>
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })
    })

    describe('accessibility dynamic tests', () => {
      const toggleGroupItem1Label = 'Mr.'
      const toggleGroupItem2Label = 'Ms. / Mrs.'
      const toggleGroupItem3Label = 'Other'

      test('tabbing through toggle group items', async () => {
        const user = userEvent.setup()

        render(
          <ToggleGroup
            aria-label="Salutations"
            defaultValue="Mr."
            type="single"
          >
            <ToggleGroupItem
              aria-label={toggleGroupItem1Label}
              label={toggleGroupItem1Label}
              value={toggleGroupItem1Label}
            />
            <ToggleGroupItem
              aria-label={toggleGroupItem2Label}
              label={toggleGroupItem2Label}
              value={toggleGroupItem2Label}
            />
            <ToggleGroupItem
              aria-label={toggleGroupItem3Label}
              label={toggleGroupItem3Label}
              value={toggleGroupItem3Label}
            />
          </ToggleGroup>
        )

        // Get the toggle group items
        const toggleGroupItem1 = screen.getByRole('radio', {
          name: toggleGroupItem1Label
        })

        const toggleGroupItem2 = screen.getByRole('radio', {
          name: toggleGroupItem2Label
        })

        const toggleGroupItem3 = screen.getByRole('radio', {
          name: toggleGroupItem3Label
        })

        await user.tab()
        expect(toggleGroupItem1).toHaveFocus()

        await user.tab()
        expect(toggleGroupItem2).toHaveFocus()

        await user.tab()
        expect(toggleGroupItem3).toHaveFocus()
      })
    })
  })
})
