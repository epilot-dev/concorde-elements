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
