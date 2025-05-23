import { render } from '@testing-library/react'
import { axe } from 'vitest-axe'

import { RadioGroup } from '../'
import { Radio } from '../../Radio'

describe('RadioGroup', () => {
  describe('accessibility > axe static tests', () => {
    it('default radio group', async () => {
      const { container } = render(
        <RadioGroup defaultValue="A">
          <Radio label="Option A" value="A" />
          <Radio label="Option B" value="B" />
          <Radio label="Option C" value="C" />
        </RadioGroup>
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('with disabled state', async () => {
      const { container } = render(
        <RadioGroup defaultValue="A" isDisabled>
          <Radio label="Option A" value="A" />
          <Radio label="Option B" value="B" />
          <Radio label="Option C" value="C" />
        </RadioGroup>
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('with required state', async () => {
      const { container } = render(
        <RadioGroup defaultValue="A" isRequired>
          <Radio label="Option A" value="A" />
          <Radio label="Option B" value="B" />
          <Radio label="Option C" value="C" />
        </RadioGroup>
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('with error state', async () => {
      const { container } = render(
        <RadioGroup defaultValue="A" error="Please select an option" isError>
          <Radio label="Option A" value="A" />
          <Radio label="Option B" value="B" />
          <Radio label="Option C" value="C" />
        </RadioGroup>
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('with vertical orientation', async () => {
      const { container } = render(
        <RadioGroup defaultValue="A" orientation="vertical">
          <Radio label="Option A" value="A" />
          <Radio label="Option B" value="B" />
          <Radio label="Option C" value="C" />
        </RadioGroup>
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('with custom colors', async () => {
      const { container } = render(
        <RadioGroup
          color="#333333"
          defaultValue="A"
          errorColor="#ff0000"
          uncheckedColor="#999999"
        >
          <Radio label="Option A" value="A" />
          <Radio label="Option B" value="B" />
          <Radio label="Option C" value="C" />
        </RadioGroup>
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('with custom size', async () => {
      const { container } = render(
        <RadioGroup defaultValue="A" size="32px">
          <Radio label="Option A" value="A" />
          <Radio label="Option B" value="B" />
          <Radio label="Option C" value="C" />
        </RadioGroup>
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('with label placement', async () => {
      const { container } = render(
        <RadioGroup defaultValue="A" labelPlacement="start">
          <Radio label="Option A" value="A" />
          <Radio label="Option B" value="B" />
          <Radio label="Option C" value="C" />
        </RadioGroup>
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('with aria-label', async () => {
      const { container } = render(
        <RadioGroup aria-label="Select an option" defaultValue="A">
          <Radio label="Option A" value="A" />
          <Radio label="Option B" value="B" />
          <Radio label="Option C" value="C" />
        </RadioGroup>
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })
  })
})
