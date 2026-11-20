import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { axe } from 'vitest-axe'

import { Slider } from '../'

describe('Slider', () => {
  describe('accessibility > axe static tests', () => {
    it('default state', async () => {
      const { container } = render(
        <Slider aria-label="Consumption" id="slider" value={40} />
      )

      expect(await axe(container)).toHaveNoViolations()
    })

    it('disabled state with scale', async () => {
      const { container } = render(
        <Slider
          aria-label="Consumption"
          id="slider"
          isDisabled
          showScale
          value={40}
        />
      )

      expect(await axe(container)).toHaveNoViolations()
    })
  })

  it('exposes min, max, step and the current value to assistive technology', () => {
    render(
      <Slider
        aria-label="Consumption"
        max={5000}
        min={500}
        step={250}
        value={1500}
      />
    )

    const slider = screen.getByRole('slider', { name: 'Consumption' })

    expect(slider).toHaveAttribute('min', '500')
    expect(slider).toHaveAttribute('max', '5000')
    expect(slider).toHaveAttribute('step', '250')
    expect(slider).toHaveValue('1500')
  })

  it('announces the formatted value and prints the scale with it', () => {
    render(
      <Slider
        aria-label="Amount"
        formatValue={(value) => `${value} €`}
        max={100}
        min={0}
        showScale
        value={25}
      />
    )

    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuetext', '25 €')
    expect(screen.getByText('0 €')).toBeInTheDocument()
    expect(screen.getByText('100 €')).toBeInTheDocument()
  })

  it('reports the numeric value on change', () => {
    const onChange = vi.fn()

    render(<Slider aria-label="Amount" onChange={onChange} value={10} />)

    fireEvent.change(screen.getByRole('slider'), { target: { value: '42' } })

    expect(onChange).toHaveBeenCalledWith(42)
  })

  it('shows an out-of-range value clamped to the rail', () => {
    render(<Slider aria-label="Amount" max={100} min={0} value={250} />)

    expect(screen.getByRole('slider')).toHaveValue('100')
  })

  describe('with a value off the step grid', () => {
    it.each([
      { value: 7, min: 0, max: 10, step: 2 },
      { value: 3, min: 0, max: 10, step: 2 },
      { value: 2.9, min: 0, max: 10, step: 2 },
      { value: 5, min: 1, max: 10, step: 3 },
      { value: 0.35, min: 0, max: 1, step: 0.1 },
      { value: 1250.5, min: 500, max: 5000, step: 250 }
    ])(
      'shows $value at its exact position on a rail from $min by $step',
      ({ value, min, max, step }) => {
        render(
          <Slider
            aria-label="Amount"
            max={max}
            min={min}
            step={step}
            value={value}
          />
        )

        const slider = screen.getByRole('slider')

        expect(slider).toHaveValue(String(value))
        expect(slider).toHaveAttribute('step', 'any')
      }
    )

    it('keeps the step while the value sits on the grid', () => {
      render(<Slider aria-label="Amount" max={10} min={0} step={2} value={6} />)

      const slider = screen.getByRole('slider')

      expect(slider).toHaveValue('6')
      expect(slider).toHaveAttribute('step', '2')
    })

    it('shows a maximum off the grid at the maximum', () => {
      render(<Slider aria-label="Amount" max={9} min={0} step={2} value={9} />)

      expect(screen.getByRole('slider')).toHaveValue('9')
    })

    it('clamps a value beyond the rail and keeps the step', () => {
      render(<Slider aria-label="Amount" max={10} min={0} step={2} value={13} />)

      const slider = screen.getByRole('slider')

      expect(slider).toHaveValue('10')
      expect(slider).toHaveAttribute('step', '2')
    })

    it('fills the rail up to the exact position', () => {
      render(<Slider aria-label="Amount" max={10} min={0} step={2} value={7} />)

      expect(
        screen
          .getByRole('slider')
          .parentElement?.style.getPropertyValue('--fill')
      ).toBe('70%')
    })

    it('announces the exact value', () => {
      render(
        <Slider
          aria-label="Amount"
          formatValue={(value) => `${value} kWh`}
          max={10}
          min={0}
          step={2}
          value={7}
        />
      )

      expect(screen.getByRole('slider')).toHaveAttribute(
        'aria-valuetext',
        '7 kWh'
      )
    })

    it('takes the step back before the pointer moves the thumb', () => {
      render(<Slider aria-label="Amount" max={10} min={0} step={2} value={7} />)

      const slider = screen.getByRole('slider')

      fireEvent.pointerDown(slider)

      expect(slider).toHaveAttribute('step', '2')
    })

    it('takes the step back before Home moves the thumb', () => {
      render(<Slider aria-label="Amount" max={10} min={0} step={2} value={7} />)

      const slider = screen.getByRole('slider')

      fireEvent.keyDown(slider, { key: 'Tab' })
      expect(slider).toHaveAttribute('step', 'any')

      fireEvent.keyDown(slider, { key: 'Home' })
      expect(slider).toHaveAttribute('step', '2')
    })

    it('snaps again once the value it reported comes back', () => {
      const onChange = vi.fn()
      const { rerender } = render(
        <Slider
          aria-label="Amount"
          max={10}
          min={0}
          onChange={onChange}
          step={2}
          value={7}
        />
      )

      const slider = screen.getByRole('slider')

      fireEvent.pointerDown(slider)
      expect(onChange).toHaveBeenCalledWith(8)

      rerender(
        <Slider
          aria-label="Amount"
          max={10}
          min={0}
          onChange={onChange}
          step={2}
          value={8}
        />
      )

      expect(slider).toHaveValue('8')
      expect(slider).toHaveAttribute('step', '2')
    })

    it('snaps to the nearest step once the pointer touches the slider', () => {
      const onChange = vi.fn()

      render(
        <Slider
          aria-label="Amount"
          max={10}
          min={0}
          onChange={onChange}
          step={2}
          value={3}
        />
      )

      fireEvent.pointerDown(screen.getByRole('slider'))

      expect(onChange).toHaveBeenCalledWith(4)
    })

    it.each([
      { key: 'ArrowRight', value: 7, expected: 8 },
      { key: 'ArrowUp', value: 7, expected: 8 },
      { key: 'ArrowLeft', value: 7, expected: 6 },
      { key: 'ArrowDown', value: 7, expected: 6 },
      { key: 'ArrowRight', value: 6.2, expected: 8 },
      { key: 'ArrowLeft', value: 7.8, expected: 6 }
    ])(
      'moves $value to the next step $key and keeps the browser from stepping on',
      ({ key, value, expected }) => {
        const onChange = vi.fn()

        render(
          <Slider
            aria-label="Amount"
            max={10}
            min={0}
            onChange={onChange}
            step={2}
            value={value}
          />
        )

        const slider = screen.getByRole('slider')

        fireEvent.keyDown(slider, { key: 'Tab' })
        expect(onChange).not.toHaveBeenCalled()

        expect(fireEvent.keyDown(slider, { key })).toBe(false)
        expect(onChange).toHaveBeenCalledTimes(1)
        expect(onChange).toHaveBeenCalledWith(expected)
      }
    )

    describe('above the last step, below a maximum off the grid', () => {
      const renderAtTop = (value: number) => {
        const onChange = vi.fn()

        render(
          <Slider
            aria-label="Amount"
            max={9}
            min={0}
            onChange={onChange}
            step={2}
            value={value}
          />
        )

        return { onChange, slider: screen.getByRole('slider') }
      }

      it.each(['ArrowRight', 'ArrowUp', 'PageUp', 'End'])(
        'moves up to the maximum on %s instead of back to the last step',
        (key) => {
          const { onChange, slider } = renderAtTop(8.5)

          expect(fireEvent.keyDown(slider, { key })).toBe(false)
          expect(onChange).toHaveBeenCalledTimes(1)
          expect(onChange).toHaveBeenCalledWith(9)
        }
      )

      it.each(['ArrowRight', 'ArrowUp', 'PageUp', 'End'])(
        'stays at the maximum on %s',
        (key) => {
          const { onChange, slider } = renderAtTop(9)

          expect(fireEvent.keyDown(slider, { key })).toBe(false)
          expect(onChange).not.toHaveBeenCalled()
          expect(slider).toHaveValue('9')
        }
      )

      it('moves a value beyond the rail to the maximum', () => {
        const { onChange, slider } = renderAtTop(13)

        expect(slider).toHaveValue('9')

        fireEvent.keyDown(slider, { key: 'ArrowRight' })

        expect(onChange).toHaveBeenCalledWith(9)
      })

      it.each(['ArrowLeft', 'ArrowDown'])(
        'still moves down to the last step on %s',
        (key) => {
          const { onChange, slider } = renderAtTop(9)

          fireEvent.keyDown(slider, { key })

          expect(onChange).toHaveBeenCalledWith(8)
        }
      )

      it('leaves End below the last step to the browser', () => {
        const { onChange, slider } = renderAtTop(7)

        expect(fireEvent.keyDown(slider, { key: 'End' })).toBe(true)
        expect(onChange).toHaveBeenCalledWith(8)
      })
    })

    it('snaps a decimal to the next decimal step without float noise', () => {
      const onChange = vi.fn()

      render(
        <Slider
          aria-label="Amount"
          max={1}
          min={0}
          onChange={onChange}
          step={0.1}
          value={0.27}
        />
      )

      fireEvent.keyDown(screen.getByRole('slider'), { key: 'ArrowUp' })

      expect(onChange).toHaveBeenCalledWith(0.3)
    })

    it('snaps to the nearest step before a page key moves the thumb', () => {
      const onChange = vi.fn()

      render(
        <Slider
          aria-label="Amount"
          max={10}
          min={0}
          onChange={onChange}
          step={2}
          value={3}
        />
      )

      const slider = screen.getByRole('slider')

      expect(fireEvent.keyDown(slider, { key: 'PageUp' })).toBe(true)
      expect(onChange).toHaveBeenCalledWith(4)
      expect(slider).toHaveAttribute('step', '2')
    })

    it('adopts the clamped position for a value beyond the rail', () => {
      const onChange = vi.fn()

      render(
        <Slider
          aria-label="Amount"
          max={100}
          min={0}
          onChange={onChange}
          value={250}
        />
      )

      fireEvent.pointerDown(screen.getByRole('slider'))

      expect(onChange).toHaveBeenCalledWith(100)
    })

    it.each([
      { name: 'read-only', props: { readOnly: true } },
      { name: 'disabled', props: { isDisabled: true } }
    ])('leaves the value alone while $name', ({ props }) => {
      const onChange = vi.fn()

      render(
        <Slider
          aria-label="Amount"
          max={10}
          min={0}
          onChange={onChange}
          step={2}
          value={3}
          {...props}
        />
      )

      fireEvent.pointerDown(screen.getByRole('slider'))

      expect(onChange).not.toHaveBeenCalled()
    })
  })

  it('reports nothing on interaction while the value sits on the grid', () => {
    const onChange = vi.fn()

    render(
      <Slider
        aria-label="Amount"
        max={10}
        min={0}
        onChange={onChange}
        step={2}
        value={4}
      />
    )

    const slider = screen.getByRole('slider')

    fireEvent.pointerDown(slider)
    fireEvent.keyDown(slider, { key: 'ArrowRight' })

    expect(onChange).not.toHaveBeenCalled()
  })

  it('ignores changes while read-only', () => {
    const onChange = vi.fn()

    render(
      <Slider aria-label="Amount" onChange={onChange} readOnly value={10} />
    )

    const slider = screen.getByRole('slider')

    fireEvent.change(slider, { target: { value: '42' } })

    expect(slider).toHaveAttribute('aria-readonly', 'true')
    expect(onChange).not.toHaveBeenCalled()
  })

  it('flags the error state for assistive technology', () => {
    render(<Slider aria-label="Amount" isError value={10} />)

    expect(screen.getByRole('slider')).toHaveAttribute('aria-invalid', 'true')
  })
})
