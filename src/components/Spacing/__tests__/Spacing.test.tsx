import { render } from '@testing-library/react'
import { axe } from 'vitest-axe'

import { Spacing } from '../'
import { Button } from '../../Button'

describe('Spacing', () => {
  describe('accessibility > axe static tests', () => {
    it('inline variant', async () => {
      const { container } = render(
        <Spacing variant="inline">
          <Button label="Button 1" />
          <Button label="Button 2" />
          <Button label="Button 3" />
        </Spacing>
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('stack variant', async () => {
      const { container } = render(
        <Spacing variant="stack">
          <Button label="Button 1" />
          <Button label="Button 2" />
          <Button label="Button 3" />
        </Spacing>
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('inset variant', async () => {
      const { container } = render(
        <Spacing variant="inset">
          <Button label="Button 1" />
        </Spacing>
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('with custom scale', async () => {
      const { container } = render(
        <Spacing scale={4} variant="inline">
          <Button label="Button 1" />
          <Button label="Button 2" />
          <Button label="Button 3" />
        </Spacing>
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('with alignItems', async () => {
      const { container } = render(
        <Spacing alignItems="center" variant="inline">
          <Button label="Button 1" />
          <Button label="Button 2" />
          <Button label="Button 3" />
        </Spacing>
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('with justifyContent', async () => {
      const { container } = render(
        <Spacing justifyContent="space-between" variant="inline">
          <Button label="Button 1" />
          <Button label="Button 2" />
          <Button label="Button 3" />
        </Spacing>
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('with custom className', async () => {
      const { container } = render(
        <Spacing className="custom-spacing" variant="inline">
          <Button label="Button 1" />
          <Button label="Button 2" />
          <Button label="Button 3" />
        </Spacing>
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })
  })
})
