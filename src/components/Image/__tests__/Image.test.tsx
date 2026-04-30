import { render, screen, waitFor, act } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'

import { Image } from '../Image'

describe('Image', () => {
  describe('accessibility > axe static tests', () => {
    it('default state with alt text', async () => {
      const { container } = render(
        <Image alt="Test image description" src="test-image.jpg" />
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('loading state with skeleton', async () => {
      const { container } = render(
        <Image
          alt="Test image description"
          isDefaultLoaded={false}
          src="test-image.jpg"
        />
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('error state with error text', async () => {
      const { container } = render(
        <Image
          alt="Test image description"
          errorText="Custom error message"
          src="invalid-image.jpg"
        />
      )

      // Trigger error state
      await act(async () => {
        const img = screen.getByRole('img')

        img.dispatchEvent(new Event('error'))
      })

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('with custom dimensions', async () => {
      const { container } = render(
        <Image
          alt="Test image description"
          dimension={{ width: 400, height: 300 }}
          src="test-image.jpg"
        />
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('with custom loading placeholder', async () => {
      const { container } = render(
        <Image
          alt="Test image description"
          isDefaultLoaded={false}
          loadingPlaceholder={
            <div aria-label="Custom loading state">Loading...</div>
          }
          src="test-image.jpg"
        />
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('with fallback image', async () => {
      const { container } = render(
        <Image
          alt="Test image description"
          fallbackSrc="fallback-image.jpg"
          src="invalid-image.jpg"
        />
      )

      // Trigger error to use fallback
      await act(async () => {
        const img = screen.getByRole('img')

        img.dispatchEvent(new Event('error'))
      })

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('animated image', async () => {
      const { container } = render(
        <Image alt="Test image description" isAnimated src="test-image.jpg" />
      )

      // Wait for the animation to complete
      await act(async () => {
        const img = screen.getByRole('img')

        img.dispatchEvent(new Event('load'))
        await new Promise((resolve) => setTimeout(resolve, 600)) // Wait for animation duration (500ms) plus a small buffer
      })

      // Wait for the image to be fully loaded and animated
      await waitFor(() => {
        const img = screen.getByRole('img')

        expect(img).toHaveAttribute('alt', 'Test image description')
        expect(img).toHaveStyle({ opacity: '1', transform: 'none' })
      })

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })

    it('without alt text (decorative image)', async () => {
      const { container } = render(
        <Image alt="" role="presentation" src="test-image.jpg" />
      )

      const results = await axe(container)

      expect(results).toHaveNoViolations()
    })
  })

  describe('functional tests', () => {
    it('shows loading state and then loaded state', async () => {
      render(
        <Image
          alt="Test image description"
          isDefaultLoaded={false}
          src="test-image.jpg"
        />
      )

      // Initially shows loading state
      expect(screen.getByRole('img')).toHaveClass('Concorde-Image__Image')

      // Trigger load
      await act(async () => {
        const img = screen.getByRole('img')

        img.dispatchEvent(new Event('load'))
      })

      // Should show loaded state
      await waitFor(() => {
        expect(screen.getByRole('img')).toHaveClass('_image-loaded_b5fb05')
      })
    })

    it('shows error state when image fails to load', async () => {
      render(
        <Image
          alt="Test image description"
          errorText="Custom error message"
          src="invalid-image.jpg"
        />
      )

      // Trigger error
      await act(async () => {
        const img = screen.getByRole('img')

        img.dispatchEvent(new Event('error'))
      })

      // Should show error message
      await waitFor(() => {
        expect(screen.getByText('Custom error message')).toBeInTheDocument()
      })
    })

    it('tries fallback image when primary image fails', async () => {
      render(
        <Image
          alt="Test image description"
          fallbackSrc="fallback-image.jpg"
          src="invalid-image.jpg"
        />
      )

      await act(async () => {
        const img = screen.getByRole('img')

        img.dispatchEvent(new Event('error'))
      })

      await waitFor(() => {
        expect(screen.getByRole('img')).toHaveAttribute(
          'src',
          'fallback-image.jpg'
        )
      })
    })
  })
})
