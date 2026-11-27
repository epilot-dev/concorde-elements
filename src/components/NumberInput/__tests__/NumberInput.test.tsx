import { render, renderHook, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { describe, expect, test, vi } from 'vitest'
import { axe } from 'vitest-axe'

import { Icon, MAX_SAFE_NUMBER_DIGITS, NumberInput, useNumberInputText } from '../..'

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

  describe('locale separators', () => {
    const renderInput = (props: Partial<Parameters<typeof NumberInput>[0]> = {}) => {
      const onChange = vi.fn()

      render(
        <NumberInput
          id="amount"
          label="Amount"
          locale="de-DE"
          onChange={onChange}
          {...props}
        />
      )

      return { input: screen.getByLabelText('Amount'), onChange }
    }

    test.each([
      ['3.500', '3.500', '3500'],
      ['1.500.000', '1.500.000', '1500000'],
      ['3,5', '3,5', '3.5'],
      ['1.234,56', '1.234,56', '1234.56']
    ])('types %s in de with grouping', async (typed, shown, value) => {
      const { input, onChange } = renderInput({ isFormattingEnabled: true })

      await userEvent.type(input, typed)

      expect(input).toHaveValue(shown)
      expect(onChange).toHaveBeenLastCalledWith(value, 'event')
    })

    test('drops a typed "." in de without grouping', async () => {
      const { input, onChange } = renderInput()

      await userEvent.type(input, '12.345')

      expect(input).toHaveValue('12345')
      expect(onChange).toHaveBeenLastCalledWith('12345', 'event')
    })

    test.each([
      ['1.500.000', '1.500.000', '1500000'],
      ['1.234,56', '1.234,56', '1234.56']
    ])('pastes %s in de', async (pasted, shown, value) => {
      const { input, onChange } = renderInput({ isFormattingEnabled: true })

      await userEvent.click(input)
      await userEvent.paste(pasted)

      expect(input).toHaveValue(shown)
      expect(onChange).toHaveBeenLastCalledWith(value, 'event')
    })

    test.each([
      { typed: '3,500.5', isFormattingEnabled: true, shown: '3,500.5', value: '3500.5' },
      { typed: '3,500.5', isFormattingEnabled: false, shown: '3500.5', value: '3500.5' },
      { typed: '1,500,000', isFormattingEnabled: true, shown: '1,500,000', value: '1500000' },
      { typed: '12.5', isFormattingEnabled: false, shown: '12.5', value: '12.5' },
      { typed: '-1234.56', isFormattingEnabled: true, shown: '-1,234.56', value: '-1234.56' },
      { typed: '2,5', isFormattingEnabled: true, shown: '25', value: '25' }
    ])(
      'types $typed in en (grouping: $isFormattingEnabled)',
      async ({ typed, isFormattingEnabled, shown, value }) => {
        const { input, onChange } = renderInput({
          isFormattingEnabled,
          locale: 'en-US'
        })

        await userEvent.type(input, typed)

        expect(input).toHaveValue(shown)
        expect(onChange).toHaveBeenLastCalledWith(value, 'event')
      }
    )

    test.each([
      { pasted: '1,500,000.75', isFormattingEnabled: true, shown: '1,500,000.75', value: '1500000.75' },
      { pasted: '1,500,000.75', isFormattingEnabled: false, shown: '1500000.75', value: '1500000.75' },
      { pasted: '2.2', isFormattingEnabled: true, shown: '2.2', value: '2.2' }
    ])(
      'pastes $pasted in en (grouping: $isFormattingEnabled)',
      async ({ pasted, isFormattingEnabled, shown, value }) => {
        const { input, onChange } = renderInput({
          isFormattingEnabled,
          locale: 'en-US'
        })

        await userEvent.click(input)
        await userEvent.paste(pasted)

        expect(input).toHaveValue(shown)
        expect(onChange).toHaveBeenLastCalledWith(value, 'event')
      }
    )
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

  describe('useNumberInputText', () => {
    test.each([
      { value: '1234.56789', isFormattingEnabled: true, decimalScale: 2 },
      { value: '1.005', decimalScale: 2 },
      { value: '2.675', decimalScale: 2 },
      { value: '8.345', decimalScale: 2 },
      { value: '1.45', decimalScale: 1 },
      { value: '9.999', decimalScale: 2 },
      { value: '-7.5', decimalScale: 0 },
      { value: '12.', decimalScale: 0 },
      { value: '12.' },
      { value: '7.5', decimalScale: 2, fixedDecimalScale: true },
      { value: 1e21, isFormattingEnabled: true },
      { value: 1.5e-7 },
      { value: '1e+21', decimalScale: 2 },
      { value: '1,5' },
      { value: '' },
      { value: null }
    ])('shows $value like the NumberInput', (props) => {
      const { container } = render(
        <NumberInput locale="de-DE" onChange={noop} readOnly {...props} />
      )
      const { result } = renderHook(() => useNumberInputText({ locale: 'de-DE', ...props }))

      expect(result.current).toBe(container.querySelector('input')?.value)
    })
  })
})
