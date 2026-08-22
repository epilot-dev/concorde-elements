import { render } from '@testing-library/react'
import { axe } from 'vitest-axe'

import { RadioBase } from '../RadioBase'
import type { RadioProps } from '../types'

describe('Radio', () => {
  describe('accessibility > axe static tests', () => {
    it('default radio', async () => {
      const { container } = render(
        <RadioBase label="Option 1" name="test" value="1" />
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('with checked state', async () => {
      const { container } = render(
        <RadioBase checked label="Option 1" name="test" value="1" />
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('with disabled state', async () => {
      const { container } = render(
        <RadioBase isDisabled label="Option 1" name="test" value="1" />
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('with required state', async () => {
      const { container } = render(
        <RadioBase isRequired label="Option 1" name="test" value="1" />
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('with error state', async () => {
      const { container } = render(
        <RadioBase isError label="Option 1" name="test" value="1" />
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('with custom size', async () => {
      const { container } = render(
        <RadioBase label="Option 1" name="test" size="32px" value="1" />
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('with label placement', async () => {
      const placements: NonNullable<RadioProps['labelPlacement']>[] = [
        'start',
        'end',
        'top',
        'bottom'
      ]
      const { container } = render(
        <>
          {placements.map((placement) => (
            <RadioBase
              key={placement}
              label={`Option ${placement}`}
              labelPlacement={placement}
              name="test"
              value={placement}
            />
          ))}
        </>
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('with custom colors', async () => {
      const { container } = render(
        <RadioBase
          color="#333333"
          errorColor="#ff0000"
          label="Option 1"
          name="test"
          uncheckedColor="#999999"
          value="1"
        />
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('with aria-label', async () => {
      const { container } = render(
        <RadioBase
          aria-label="Select option 1"
          label="Option 1"
          name="test"
          value="1"
        />
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('with description', async () => {
      const { container, getByRole, getByText } = render(
        <RadioBase
          description="A longer description of option 1"
          id="option-1"
          label="Option 1"
          name="test"
          value="1"
        />
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()

      // description is linked via aria-describedby and excluded from the name
      const radio = getByRole('radio', { name: 'Option 1' })

      expect(radio).toHaveAttribute('aria-labelledby', 'option-1-label')
      expect(radio).toHaveAttribute('aria-describedby', 'option-1-description')
      expect(radio).toHaveAccessibleDescription(
        'A longer description of option 1'
      )
      expect(getByText('A longer description of option 1')).toHaveAttribute(
        'id',
        'option-1-description'
      )
    })

    it('with description merges an existing aria-describedby', () => {
      const { getByRole } = render(
        <RadioBase
          aria-describedby="block-errorMessage"
          description="A longer description of option 1"
          id="option-1"
          label="Option 1"
          name="test"
          value="1"
        />
      )

      expect(getByRole('radio')).toHaveAttribute(
        'aria-describedby',
        'option-1-description block-errorMessage'
      )
    })

    it('with required state and description keeps asterisk in the name', () => {
      const { getByRole } = render(
        <RadioBase
          description="A longer description of option 1"
          id="option-1"
          isRequired
          label="Option 1"
          name="test"
          value="1"
        />
      )

      expect(getByRole('radio', { name: /Option 1/ })).toBeInTheDocument()
    })
  })
})
