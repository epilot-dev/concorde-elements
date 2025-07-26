import { render } from '@testing-library/react'
import { axe } from 'vitest-axe'

import { Rating } from '../'

describe('Rating', () => {
  describe('accessibility > axe static tests', () => {
    it('default rating', async () => {
      const { container } = render(
        <Rating id="test-rating" max={5} name="Test Rating" />
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('with value', async () => {
      const { container } = render(
        <Rating id="test-rating" max={5} name="Test Rating" value={3} />
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('with custom icon', async () => {
      const { container } = render(
        <Rating
          iconName="favorite"
          id="test-rating"
          max={5}
          name="Test Rating"
        />
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('with labels', async () => {
      const { container } = render(
        <Rating
          id="test-rating"
          labels={['Poor', 'Fair', 'Good', 'Very Good', 'Excellent']}
          max={5}
          name="Test Rating"
        />
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('with custom max value', async () => {
      const { container } = render(
        <Rating id="test-rating" max={10} name="Test Rating" />
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('with custom icon class name', async () => {
      const { container } = render(
        <Rating
          iconClassName="custom-icon"
          id="test-rating"
          max={5}
          name="Test Rating"
        />
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('with aria-label', async () => {
      const { container } = render(
        <Rating
          aria-label="Rate your experience"
          id="test-rating"
          max={5}
          name="Test Rating"
        />
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })
  })
})
