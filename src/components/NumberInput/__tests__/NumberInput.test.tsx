import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { describe, expect, test, vi } from 'vitest'
import { axe } from 'vitest-axe'

import { Icon, MAX_SAFE_NUMBER_DIGITS, NumberInput } from '../..'

const noop = () => {}

describe('NumberInput', () => {
  describe('accessibility', () => {
    describe('axe static tests', () => {
      test('default', async () => {
        const { container } = render(
          <NumberInput
            id="test-id"
            label="Default"
            onChange={noop}
            placeholder="Enter anything..."
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('filled variant', async () => {
        const { container } = render(
          <NumberInput
            id="test-id"
            label="Default"
            onChange={noop}
            placeholder="Enter anything..."
            variant="filled"
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with value', async () => {
        const { container } = render(
          <NumberInput
            id="test-id"
            label="Default"
            onChange={noop}
            placeholder="Enter anything..."
            value="123"
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('required', async () => {
        const { container } = render(
          <NumberInput
            id="test-id"
            isRequired={true}
            label="Default"
            onChange={noop}
            placeholder="Enter anything..."
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with helper text', async () => {
        const { container } = render(
          <NumberInput
            helperText="This is a subtext"
            id="test-id"
            label="Default"
            onChange={noop}
            placeholder="Enter anything..."
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('error state', async () => {
        const { container } = render(
          <NumberInput
            helperText="This is an error subtext"
            id="test-id"
            isError={true}
            isRequired={true}
            label="Default"
            onChange={noop}
            placeholder="Enter anything..."
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('disabled state', async () => {
        const { container } = render(
          <NumberInput
            helperText="This is an error subtext"
            id="test-id"
            isDisabled={true}
            isError={true}
            isRequired={true}
            label="Default"
            onChange={noop}
            placeholder="Enter anything..."
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with left adornment', async () => {
        const { container } = render(
          <NumberInput
            id="test-id"
            label="Default"
            onChange={noop}
            placeholder="Enter anything..."
            startAdornment={<Icon name="info" />}
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with right adornment', async () => {
        const { container } = render(
          <NumberInput
            endAdornment={<Icon name="close" />}
            id="test-id"
            label="Default"
            onChange={noop}
            placeholder="Search"
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with both adornments', async () => {
        const { container } = render(
          <NumberInput
            endAdornment={<Icon name="close" />}
            id="test-id"
            label="Control"
            onChange={noop}
            placeholder="Search"
            startAdornment={<Icon name="info" />}
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with floating label', async () => {
        const { container } = render(
          <NumberInput
            endAdornment={<Icon name="close" />}
            floatingLabel="kVA"
            id="test-id"
            label="Number Input"
            onChange={noop}
            placeholder="0"
            startAdornment={<Icon name="info" />}
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('without thousand formatting', async () => {
        const { container } = render(
          <NumberInput
            floatingLabel="kVA"
            id="test-id"
            isFormattingEnabled={false}
            label="Number Input"
            onChange={noop}
            placeholder="0"
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })
    })
  })

  describe('maxDigits', () => {
    const renderInput = (props: Partial<Parameters<typeof NumberInput>[0]> = {}) => {
      const onChange = vi.fn()

      render(
        <NumberInput
          id="reading"
          label="Reading"
          locale="en-US"
          maxDigits={MAX_SAFE_NUMBER_DIGITS}
          onChange={onChange}
          {...props}
        />
      )

      return { input: screen.getByLabelText('Reading'), onChange }
    }

    test('stops typing at the digit limit', async () => {
      const { input, onChange } = renderInput()

      await userEvent.type(input, '12345678901234567890')

      expect(input).toHaveValue('123456789012345')
      expect(onChange).toHaveBeenLastCalledWith('123456789012345', 'event')
    })

    test('does not count sign and decimal separator', async () => {
      const { input, onChange } = renderInput()

      await userEvent.type(input, '-1234567890.123456')

      expect(input).toHaveValue('-1234567890.12345')
      expect(onChange).toHaveBeenLastCalledWith('-1234567890.12345', 'event')
    })

    test('does not count locale group separators', async () => {
      const { input, onChange } = renderInput({
        isFormattingEnabled: true,
        locale: 'de-DE'
      })

      await userEvent.type(input, '1234567890123,456')

      expect(input).toHaveValue('1.234.567.890.123,45')
      expect(onChange).toHaveBeenLastCalledWith('1234567890123.45', 'event')
    })

    test('rejects a paste that exceeds the limit', async () => {
      const { input, onChange } = renderInput()

      await userEvent.click(input)
      await userEvent.paste('12312313131231211.12')

      expect(input).toHaveValue('')
      expect(onChange).not.toHaveBeenCalled()
    })

    test('accepts a paste within the limit', async () => {
      const { input, onChange } = renderInput()

      await userEvent.click(input)
      await userEvent.paste('-1234567890.12345')

      expect(input).toHaveValue('-1234567890.12345')
      expect(onChange).toHaveBeenLastCalledWith('-1234567890.12345', 'event')
    })

    test('lets a longer prefilled value be shortened', async () => {
      const { input, onChange } = renderInput({ value: '12345678901234567890' })

      await userEvent.type(input, '{backspace}')

      expect(input).toHaveValue('1234567890123456789')
      expect(onChange).toHaveBeenLastCalledWith('1234567890123456789', 'event')
    })

    test('still applies a custom isAllowed', async () => {
      const { input } = renderInput({
        isAllowed: ({ floatValue }) => (floatValue ?? 0) < 100
      })

      await userEvent.type(input, '123')

      expect(input).toHaveValue('12')
    })

    test('does not limit digits without maxDigits', async () => {
      const { input } = renderInput({ maxDigits: undefined })

      await userEvent.type(input, '12345678901234567890')

      expect(input).toHaveValue('12345678901234567890')
    })
  })
})
