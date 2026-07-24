import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { axe } from 'vitest-axe'

import { ImageStepper } from '..'

const images = [
  {
    id: '1',
    src: 'https://via.placeholder.com/250x200?text=Image+1',
    alt: 'Test image 1'
  },
  {
    id: '2',
    src: 'https://via.placeholder.com/250x200?text=Image+2',
    alt: 'Test image 2'
  },
  {
    id: '3',
    src: 'https://via.placeholder.com/250x200?text=Image+3',
    alt: 'Test image 3'
  }
]

describe('ImageStepper', () => {
  describe('accessibility', () => {
    describe('axe static tests', () => {
      test('default state', async () => {
        const { container } = render(
          <ImageStepper images={images} position="static" variant="dots" />
        )

        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with text variant', async () => {
        const { container } = render(
          <ImageStepper images={images} position="static" variant="text" />
        )

        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with progress variant', async () => {
        const { container } = render(
          <ImageStepper images={images} position="static" variant="progress" />
        )

        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with custom colors', async () => {
        const { container } = render(
          <ImageStepper
            activeStepBgColor="#000000"
            backgroundColor="#ffffff"
            color="#ff0000"
            images={images}
            stepBgColor="#cccccc"
          />
        )

        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with different positions', async () => {
        const { container } = render(
          <ImageStepper images={images} position="bottom" />
        )

        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with custom class name', async () => {
        const { container } = render(
          <ImageStepper className="custom-stepper" images={images} />
        )

        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with custom style', async () => {
        const { container } = render(
          <ImageStepper
            images={images}
            style={{ backgroundColor: '#f0f0f0' }}
          />
        )

        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with custom id', async () => {
        const { container } = render(
          <ImageStepper id="test-stepper" images={images} />
        )

        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })
    })

    describe('interactive accessibility tests', () => {
      test('navigation buttons are focusable', async () => {
        const user = userEvent.setup()

        render(<ImageStepper images={images} />)

        const nextButton = screen.getByRole('button', { name: 'Next button' })

        // Click on the next button to get to the second image,
        // then tab to the back and next buttons
        await user.click(nextButton)

        const backButton = screen.getByRole('button', { name: 'Back button' })

        await user.tab()

        backButton.focus()
        expect(backButton).toHaveFocus()

        await user.tab()
        expect(nextButton).toHaveFocus()
      })
    })
  })
})
