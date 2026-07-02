import { render, screen, waitFor, act } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
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

    it('shows error state after retries are exhausted', async () => {
      vi.useFakeTimers({ shouldAdvanceTime: true })

      try {
        render(
          <Image
            alt="Test image description"
            errorText="Custom error message"
            src="invalid-image.jpg"
          />
        )

        // 1 initial attempt + 3 retries = 4 total error events before giving up
        for (let attempt = 0; attempt < 4; attempt++) {
          await act(async () => {
            screen.getByRole('img').dispatchEvent(new Event('error'))
          })

          await act(async () => {
            await vi.runAllTimersAsync()
          })
        }

        await waitFor(() => {
          expect(screen.getByText('Custom error message')).toBeInTheDocument()
        })
      } finally {
        vi.useRealTimers()
      }
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

  describe('container aspect ratio', () => {
    const getContainer = (root: HTMLElement) =>
      root.querySelector('.Concorde-Image') as HTMLElement

    it('uses the provided dimension snapshot before the image loads', () => {
      const { container } = render(
        <Image
          alt="Test image"
          dimension={{ width: 400, height: 200 }}
          isDefaultLoaded={false}
          src="test-image.jpg"
        />
      )

      expect(getContainer(container).style.aspectRatio).toBe('2')
    })

    it('prefers the loaded image natural dimensions over a stale snapshot', async () => {
      const { container } = render(
        <Image
          alt="Test image"
          // stale snapshot (1:1) — e.g. file was replaced with a new version
          dimension={{ width: 100, height: 100 }}
          isDefaultLoaded={false}
          src="test-image.jpg"
        />
      )

      // before load: the snapshot drives the reserved aspect ratio (prevents CLS)
      expect(getContainer(container).style.aspectRatio).toBe('1')

      // the actual image loads with different natural dimensions (2:1)
      await act(async () => {
        const img = screen.getByRole('img')

        Object.defineProperty(img, 'naturalWidth', {
          configurable: true,
          value: 800
        })
        Object.defineProperty(img, 'naturalHeight', {
          configurable: true,
          value: 400
        })
        img.dispatchEvent(new Event('load'))
      })

      // after load: the settled container adopts the real ratio, not the stale one
      await waitFor(() => {
        expect(getContainer(container).style.aspectRatio).toBe('2')
      })
    })

    it('keeps the snapshot ratio when natural dimensions are unavailable', async () => {
      const { container } = render(
        <Image
          alt="Test image"
          dimension={{ width: 300, height: 100 }}
          isDefaultLoaded={false}
          src="test-image.jpg"
        />
      )

      await act(async () => {
        // jsdom reports naturalWidth/naturalHeight as 0, so the snapshot stands
        screen.getByRole('img').dispatchEvent(new Event('load'))
      })

      await waitFor(() => {
        expect(getContainer(container).style.aspectRatio).toBe('3')
      })
    })

    it('never forces an aspect ratio when no dimension is provided', async () => {
      const { container } = render(
        <Image alt="Test image" isDefaultLoaded={false} src="test-image.jpg" />
      )

      // before load: nothing reserved — consumer frames via CSS
      expect(getContainer(container).style.aspectRatio).toBe('')

      // a portrait image loads (2:3); its natural dimensions must NOT be
      // forced onto the container, or the frame would inflate (CLS-free)
      await act(async () => {
        const img = screen.getByRole('img')

        Object.defineProperty(img, 'naturalWidth', {
          configurable: true,
          value: 400
        })
        Object.defineProperty(img, 'naturalHeight', {
          configurable: true,
          value: 600
        })
        img.dispatchEvent(new Event('load'))
      })

      await waitFor(() => {
        expect(getContainer(container).style.aspectRatio).toBe('')
      })
    })
  })

  describe('retry behavior on transient load errors', () => {
    beforeEach(() => {
      vi.useFakeTimers({ shouldAdvanceTime: true })
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('does not show the error state on a single load failure', async () => {
      render(
        <Image
          alt="Test image description"
          errorText="Custom error message"
          src="invalid-image.jpg"
        />
      )

      await act(async () => {
        screen.getByRole('img').dispatchEvent(new Event('error'))
      })

      expect(screen.queryByText('Custom error message')).not.toBeInTheDocument()
      expect(screen.getByRole('img')).toBeInTheDocument()
    })

    it('retries loading after a failure and clears the error state when load succeeds', async () => {
      render(
        <Image
          alt="Test image description"
          errorText="Custom error message"
          src="image.jpg"
        />
      )

      await act(async () => {
        screen.getByRole('img').dispatchEvent(new Event('error'))
      })

      await act(async () => {
        await vi.runAllTimersAsync()
      })

      // The img element should still be present and the error state never shown.
      expect(screen.queryByText('Custom error message')).not.toBeInTheDocument()

      await act(async () => {
        screen.getByRole('img').dispatchEvent(new Event('load'))
      })

      await waitFor(() => {
        expect(screen.getByRole('img')).toHaveClass('_image-loaded_b5fb05')
      })
      expect(screen.queryByText('Custom error message')).not.toBeInTheDocument()
    })

    it('cycles between primary and fallback during retries before giving up', async () => {
      render(
        <Image
          alt="Test image description"
          errorText="Custom error message"
          fallbackSrc="fallback-image.jpg"
          src="primary-image.jpg"
        />
      )

      // Primary fails → switches to fallback
      await act(async () => {
        screen.getByRole('img').dispatchEvent(new Event('error'))
      })
      expect(screen.getByRole('img')).toHaveAttribute(
        'src',
        'fallback-image.jpg'
      )

      // Fallback fails → schedules a retry back to primary
      await act(async () => {
        screen.getByRole('img').dispatchEvent(new Event('error'))
      })
      await act(async () => {
        await vi.runAllTimersAsync()
      })
      expect(screen.getByRole('img')).toHaveAttribute(
        'src',
        'primary-image.jpg'
      )
      expect(screen.queryByText('Custom error message')).not.toBeInTheDocument()
    })
  })
})
