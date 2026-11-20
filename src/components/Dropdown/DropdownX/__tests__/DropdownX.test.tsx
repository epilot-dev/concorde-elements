import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { DropdownX } from '../DropdownX'

const options = [
  { label: 'Mr', value: 'mr' },
  { label: 'Ms', value: 'ms' }
]

const trigger = () => screen.getByRole('button', { name: 'Salutation' })

describe('DropdownX required state', () => {
  it('describes a required trigger as required, since a button cannot take aria-required', () => {
    render(<DropdownX inputId="salutation" isRequired label="Salutation" options={options} />)

    expect(trigger()).toHaveAccessibleDescription('Pflichtfeld')
    expect(trigger()).not.toHaveAttribute('aria-required')
  })

  it('keeps the error message in the description next to required', () => {
    render(
      <DropdownX
        helperText="Please choose one"
        inputId="salutation"
        isError
        isRequired
        label="Salutation"
        options={options}
      />
    )

    expect(trigger()).toHaveAccessibleDescription('Please choose one Pflichtfeld')
  })

  it('has no required description when optional', () => {
    render(<DropdownX inputId="salutation" label="Salutation" options={options} />)

    expect(trigger()).not.toHaveAccessibleDescription('Pflichtfeld')
  })
})
