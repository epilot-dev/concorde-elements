import { render } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { axe } from 'vitest-axe'
import 'vitest-axe/extend-expect'

import { Icon } from '../../Icon'
import { Button } from '../Button'

describe('Button', () => {
  describe('accessibility', () => {
    describe('axe static tests', () => {
      test('primary variant', async () => {
        const { container } = render(
          <Button label="Button" variant="primary" />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('ghost variant', async () => {
        const { container } = render(<Button label="Button" variant="ghost" />)
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('primary danger variant', async () => {
        const { container } = render(
          <Button label="Button" variant="primary-danger" />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('ghost danger variant', async () => {
        const { container } = render(
          <Button label="Button" variant="ghost-danger" />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('outlined variant', async () => {
        const { container } = render(
          <Button label="Button" variant="outlined" />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('disabled variant', async () => {
        const { container } = render(
          <Button label="Button" variant="disabled" />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('disabled primary button', async () => {
        const { container } = render(
          <Button isDisabled={true} label="Button" variant="primary" />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('disabled ghost button', async () => {
        const { container } = render(
          <Button isDisabled={true} label="Button" variant="ghost" />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('disabled outlined button', async () => {
        const { container } = render(
          <Button isDisabled={true} label="Button" variant="outlined" />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('button with left icon', async () => {
        const { container } = render(
          <Button
            label="Button"
            leftIcon={<Icon name="info" />}
            variant="ghost"
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('button with right icon', async () => {
        const { container } = render(
          <Button
            label="Button"
            rightIcon={<Icon name="close" />}
            variant="primary"
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('button with both icons', async () => {
        const { container } = render(
          <Button
            label="Button"
            leftIcon={<Icon name="info" />}
            rightIcon={<Icon name="close" />}
            variant="primary"
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('link button', async () => {
        const { container } = render(
          <Button
            href="https://www.google.com"
            isLink={true}
            label="Button"
            rel="noopener"
            rightIcon={<Icon name="open_in_new" />}
            target="_blank"
            variant="primary"
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })
    })
  })
})
