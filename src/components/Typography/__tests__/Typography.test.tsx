import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'

import { Typography } from '../'

describe('Typography', () => {
  describe('accessibility > axe static tests', () => {
    it('default state (paragraph)', async () => {
      const { container } = render(
        <Typography>This is a paragraph of text</Typography>
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('heading level 1', async () => {
      const { container } = render(
        <Typography as="h1">This is a heading level 1</Typography>
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('heading level 2', async () => {
      const { container } = render(
        <Typography as="h2">This is a heading level 2</Typography>
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('heading level 3', async () => {
      const { container } = render(
        <Typography as="h3">This is a heading level 3</Typography>
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('heading level 4', async () => {
      const { container } = render(
        <Typography as="h4">This is a heading level 4</Typography>
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('heading level 5', async () => {
      const { container } = render(
        <Typography as="h5">This is a heading level 5</Typography>
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('heading level 6', async () => {
      const { container } = render(
        <Typography as="h6">This is a heading level 6</Typography>
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('span element', async () => {
      const { container } = render(
        <Typography as="span">This is a span of text</Typography>
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('primary variant', async () => {
      const { container } = render(
        <Typography variant="primary">Primary text</Typography>
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('secondary variant', async () => {
      const { container } = render(
        <Typography variant="secondary">Secondary text</Typography>
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('error variant', async () => {
      const { container } = render(
        <Typography variant="error">Error text</Typography>
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('disabled variant', async () => {
      const { container } = render(
        <Typography variant="disabled">Disabled text</Typography>
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('with custom color', async () => {
      const { container } = render(
        <Typography
          style={
            { '--concorde-typography-color': '#333333' } as React.CSSProperties
          }
        >
          Custom colored text
        </Typography>
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('with custom class name', async () => {
      const { container } = render(
        <Typography className="custom-class">Text with custom class</Typography>
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })
  })
})
