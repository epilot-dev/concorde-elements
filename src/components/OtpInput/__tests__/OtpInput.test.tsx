import { fireEvent, render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { createRef, useState } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'

import { OtpInput } from '..'
import type { OtpInputProps } from '..'

type ControlledProps = Partial<OtpInputProps> & { initialValue?: string }

const ControlledOtpInput = ({
  initialValue = '',
  onChange,
  ...props
}: ControlledProps) => {
  const [value, setValue] = useState(initialValue)

  return (
    <OtpInput
      id="otp"
      label="Verification code"
      {...props}
      onChange={(next) => {
        setValue(next)
        onChange?.(next)
      }}
      value={value}
    />
  )
}

const getBoxes = () => screen.getAllByRole('textbox') as HTMLInputElement[]
const getValues = () => getBoxes().map((box) => box.value)

describe('OtpInput', () => {
  describe('accessibility > axe static tests', () => {
    it('default state', async () => {
      const { container } = render(<ControlledOtpInput />)

      expect(await axe(container)).toHaveNoViolations()
    })

    it('required error state with helper text', async () => {
      const { container } = render(
        <ControlledOtpInput
          helperText="The code is incorrect"
          isError
          isRequired
        />
      )

      expect(await axe(container)).toHaveNoViolations()
    })

    it('disabled state', async () => {
      const { container } = render(
        <ControlledOtpInput initialValue="12" isDisabled />
      )

      expect(await axe(container)).toHaveNoViolations()
    })
  })

  describe('rendering', () => {
    it('renders one named box per character inside a labelled group', () => {
      render(<ControlledOtpInput length={4} />)

      expect(
        screen.getByRole('group', { name: 'Verification code' })
      ).toBeInTheDocument()
      expect(getBoxes()).toHaveLength(4)
      expect(screen.getByLabelText('Digit 1 of 4')).toHaveAttribute('id', 'otp')
      expect(screen.getByLabelText('Digit 4 of 4')).toBeInTheDocument()
    })

    it('sets numeric keyboard hints and one-time-code autofill on the first box', () => {
      render(<ControlledOtpInput />)

      const [first, second] = getBoxes()

      expect(first).toHaveAttribute('autocomplete', 'one-time-code')
      expect(first).toHaveAttribute('inputmode', 'numeric')
      expect(first).toHaveAttribute('pattern', '[0-9]*')
      expect(second).toHaveAttribute('autocomplete', 'off')
    })

    it('uses custom box aria labels', () => {
      render(
        <ControlledOtpInput
          getBoxAriaLabel={(index, length) =>
            `Ziffer ${index + 1} von ${length}`
          }
          length={3}
        />
      )

      expect(screen.getByLabelText('Ziffer 2 von 3')).toBeInTheDocument()
    })

    it('shows only allowed characters of the controlled value', () => {
      render(<ControlledOtpInput initialValue="a1 b2" length={4} />)

      expect(getValues()).toEqual(['1', '2', '', ''])
    })

    it('describes every box with the error message', () => {
      render(<ControlledOtpInput helperText="Wrong code" isError length={2} />)

      for (const box of getBoxes()) {
        expect(box).toHaveAttribute('aria-invalid', 'true')
        expect(box).toHaveAccessibleDescription('Wrong code')
      }
    })

    it('forwards the ref to the first box', () => {
      const ref = createRef<HTMLInputElement>()

      render(<OtpInput onChange={vi.fn()} ref={ref} value="" />)

      expect(ref.current).toBe(getBoxes()[0])
    })

    it('mirrors the code into a hidden input when named', () => {
      const { container } = render(
        <ControlledOtpInput initialValue="123" name="code" />
      )

      expect(container.querySelector('input[name="code"]')).toHaveValue('123')
    })
  })

  describe('typing', () => {
    it('fills the boxes and moves focus to the next box', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()

      render(<ControlledOtpInput onChange={onChange} />)

      await user.click(getBoxes()[0])
      await user.keyboard('123')

      expect(getValues()).toEqual(['1', '2', '3', '', '', ''])
      expect(onChange).toHaveBeenLastCalledWith('123')
      expect(getBoxes()[3]).toHaveFocus()
    })

    it('drops a focus move the parent never rendered', async () => {
      const user = userEvent.setup()
      const ignore = () => undefined
      const view = (helperText?: string) => (
        <>
          <OtpInput helperText={helperText} onChange={ignore} value="1234" />
          <button type="button">Elsewhere</button>
        </>
      )
      const { rerender } = render(view())

      // The parent keeps "1234", so the Backspace edit never arrives
      await user.click(getBoxes()[3])
      await user.keyboard('{Backspace}')
      await user.click(screen.getByRole('button', { name: 'Elsewhere' }))

      // A later, unrelated render must not pull focus back into the code
      rerender(view('Later'))

      expect(screen.getByRole('button', { name: 'Elsewhere' })).toHaveFocus()
    })

    it('ignores non-digit characters', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()

      render(<ControlledOtpInput onChange={onChange} />)

      await user.click(getBoxes()[0])
      await user.keyboard('a1 -b')

      expect(getValues()).toEqual(['1', '', '', '', '', ''])
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(getBoxes()[1]).toHaveFocus()
    })

    it('accepts letters when alphanumeric', async () => {
      const user = userEvent.setup()

      render(<ControlledOtpInput length={3} validationType="alphanumeric" />)

      await user.click(getBoxes()[0])
      await user.keyboard('a1B')

      expect(getValues()).toEqual(['a', '1', 'B'])
      expect(getBoxes()[0]).toHaveAttribute('inputmode', 'text')
    })

    it('replaces the character of a filled box', async () => {
      const user = userEvent.setup()

      render(<ControlledOtpInput initialValue="123" />)

      await user.click(getBoxes()[1])
      await user.keyboard('9')

      expect(getValues().join('')).toBe('193')
      expect(getBoxes()[2]).toHaveFocus()
    })

    it('redirects focus from a later box to the next empty one', async () => {
      const user = userEvent.setup()

      render(<ControlledOtpInput initialValue="12" />)

      await user.click(getBoxes()[5])

      expect(getBoxes()[2]).toHaveFocus()
    })

    it('calls onComplete once every box is filled', async () => {
      const user = userEvent.setup()
      const onComplete = vi.fn()

      render(<ControlledOtpInput length={4} onComplete={onComplete} />)

      await user.click(getBoxes()[0])
      await user.keyboard('123')
      expect(onComplete).not.toHaveBeenCalled()

      await user.keyboard('4')
      expect(onComplete).toHaveBeenCalledTimes(1)
      expect(onComplete).toHaveBeenCalledWith('1234')
    })
  })

  describe('keyboard navigation', () => {
    it('clears the current box, then moves back on Backspace', async () => {
      const user = userEvent.setup()

      render(<ControlledOtpInput initialValue="123" />)

      await user.click(getBoxes()[2])
      await user.keyboard('{Backspace}')

      expect(getValues().join('')).toBe('12')
      expect(getBoxes()[2]).toHaveFocus()

      await user.keyboard('{Backspace}')

      expect(getValues().join('')).toBe('1')
      expect(getBoxes()[1]).toHaveFocus()
    })

    it('moves focus with arrow, Home and End keys', async () => {
      const user = userEvent.setup()

      render(<ControlledOtpInput initialValue="123" />)

      await user.click(getBoxes()[3])
      await user.keyboard('{ArrowLeft}')
      expect(getBoxes()[2]).toHaveFocus()

      await user.keyboard('{Home}')
      expect(getBoxes()[0]).toHaveFocus()

      await user.keyboard('{ArrowRight}')
      expect(getBoxes()[1]).toHaveFocus()

      await user.keyboard('{End}')
      expect(getBoxes()[3]).toHaveFocus()

      await user.keyboard('{ArrowRight}')
      expect(getBoxes()[3]).toHaveFocus()
    })

    it('keeps a single tab stop on the next empty box', () => {
      render(<ControlledOtpInput initialValue="12" />)

      const tabbable = getBoxes().filter((box) => box.tabIndex === 0)

      expect(tabbable).toEqual([getBoxes()[2]])
    })
  })

  describe('paste and autofill', () => {
    it('fills from the start on paste, ignoring whitespace and non-digits', async () => {
      const user = userEvent.setup()
      const onComplete = vi.fn()

      render(<ControlledOtpInput initialValue="99" onComplete={onComplete} />)

      await user.click(getBoxes()[2])
      await user.paste(' 12 34-56 ')

      expect(getValues()).toEqual(['1', '2', '3', '4', '5', '6'])
      expect(onComplete).toHaveBeenCalledWith('123456')
      expect(getBoxes()[5]).toHaveFocus()
    })

    it('truncates pasted codes to the length', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()

      render(<ControlledOtpInput length={4} onChange={onChange} />)

      await user.click(getBoxes()[0])
      await user.paste('12345678')

      expect(onChange).toHaveBeenCalledWith('1234')
    })

    it('ignores pastes without digits', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()

      render(<ControlledOtpInput onChange={onChange} />)

      await user.click(getBoxes()[0])
      await user.paste('abc')

      expect(onChange).not.toHaveBeenCalled()
    })

    it('distributes a whole code autofilled into a single box', () => {
      const onChange = vi.fn()
      const onComplete = vi.fn()

      render(<ControlledOtpInput onChange={onChange} onComplete={onComplete} />)

      fireEvent.change(getBoxes()[0], { target: { value: '654321' } })

      expect(getValues()).toEqual(['6', '5', '4', '3', '2', '1'])
      expect(onChange).toHaveBeenCalledWith('654321')
      expect(onComplete).toHaveBeenCalledWith('654321')
    })
  })

  describe('disabled', () => {
    it('disables every box and ignores input', async () => {
      const user = userEvent.setup()
      const onChange = vi.fn()

      render(<ControlledOtpInput isDisabled onChange={onChange} />)

      for (const box of getBoxes()) {
        expect(box).toBeDisabled()
      }

      await user.click(getBoxes()[0])
      await user.keyboard('12')

      expect(onChange).not.toHaveBeenCalled()
    })
  })

  describe('focus events', () => {
    it('fires onFocus and onBlur only when focus enters or leaves the group', async () => {
      const user = userEvent.setup()
      const onFocus = vi.fn()
      const onBlur = vi.fn()

      render(
        <>
          <ControlledOtpInput onBlur={onBlur} onFocus={onFocus} />
          <button type="button">Next</button>
        </>
      )

      await user.click(getBoxes()[0])
      await user.keyboard('12')
      expect(onFocus).toHaveBeenCalledTimes(1)
      expect(onBlur).not.toHaveBeenCalled()

      await user.click(screen.getByRole('button', { name: 'Next' }))
      expect(onBlur).toHaveBeenCalledTimes(1)
    })

    it('focuses the next empty box when autoFocus is set', () => {
      render(<ControlledOtpInput autoFocus initialValue="1" />)

      expect(getBoxes()[1]).toHaveFocus()
    })
  })
})
