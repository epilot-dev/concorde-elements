import { render, screen } from '@testing-library/react'

import { HelperText } from '../HelperText'

describe('HelperText', () => {
  it('renders nothing without text', () => {
    const { container } = render(<HelperText variant="warning" />)

    expect(container).toBeEmptyDOMElement()
  })

  it('renders a neutral hint without a live-region role', () => {
    render(<HelperText>Hint</HelperText>)

    expect(screen.getByText('Hint')).not.toHaveAttribute('role')
    expect(screen.getByText('Hint')).toHaveClass('Concorde-HelperText--default')
  })

  it('announces an error assertively', () => {
    render(<HelperText variant="error">Required</HelperText>)

    expect(screen.getByRole('alert')).toHaveTextContent('Required')
  })

  it('announces a warning politely', () => {
    render(<HelperText variant="warning">Unusual value</HelperText>)

    expect(screen.getByRole('status')).toHaveTextContent('Unusual value')
    expect(screen.getByRole('status')).toHaveClass(
      'Concorde-HelperText--warning'
    )
  })
})
