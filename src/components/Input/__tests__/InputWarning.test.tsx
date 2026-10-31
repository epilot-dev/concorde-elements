import { render, screen } from '@testing-library/react'

import { Input, InputStatusProvider, Textarea } from '..'

const container = (label: string) =>
  screen.getByLabelText(label).closest('.Concorde-Input')

describe('Input warning state', () => {
  it('highlights the input without error semantics', () => {
    render(<Input id="iban" isWarning label="IBAN" />)

    expect(container('IBAN')).toHaveClass('Concorde-Input--warning')
    expect(screen.getByLabelText('IBAN')).not.toHaveAttribute(
      'aria-describedby'
    )
  })

  it('lets the error state win over the warning', () => {
    render(
      <Input
        helperText="Required"
        id="iban"
        isError
        isWarning
        label="IBAN"
      />
    )

    expect(container('IBAN')).not.toHaveClass('Concorde-Input--warning')
    expect(screen.getByRole('alert')).toHaveTextContent('Required')
  })

  it('takes the warning state from InputStatusProvider', () => {
    render(
      <InputStatusProvider value={{ isWarning: true }}>
        <Input id="iban" label="IBAN" />
        <Textarea id="note" label="Note" />
      </InputStatusProvider>
    )

    expect(container('IBAN')).toHaveClass('Concorde-Input--warning')
    expect(container('Note')).toHaveClass('Concorde-Input--warning')
  })

  it('prefers its own prop over the provider', () => {
    render(
      <InputStatusProvider value={{ isWarning: true }}>
        <Input id="iban" isWarning={false} label="IBAN" />
      </InputStatusProvider>
    )

    expect(container('IBAN')).not.toHaveClass('Concorde-Input--warning')
  })
})
