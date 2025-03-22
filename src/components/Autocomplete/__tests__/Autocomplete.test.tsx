import { render } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { axe } from 'vitest-axe'

import { Icon } from '../../Icon'
import { Autocomplete } from '../Autocomplete'

const options = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

describe('Autocomplete', () => {
  describe('accessibility', () => {
    describe('axe static tests', () => {
      test('default', async () => {
        const { container } = render(
          <Autocomplete label="test" options={options} />
        )

        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with default value', async () => {
        const { container } = render(
          <Autocomplete
            label="Select a month"
            options={options}
            value={options[0]}
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('disabled state', async () => {
        const { container } = render(
          <Autocomplete
            isDisabled={true}
            label="Select a month"
            options={options}
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('required state', async () => {
        const { container } = render(
          <Autocomplete
            isRequired={true}
            label="Select a month"
            options={options}
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with helper text', async () => {
        const { container } = render(
          <Autocomplete
            helperText="This is a subtext"
            label="Select a month"
            options={options}
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('error state', async () => {
        const { container } = render(
          <Autocomplete
            helperText="This is an error subtext"
            isError={true}
            isRequired={true}
            label="Select a month"
            options={options}
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with disabled options', async () => {
        const { container } = render(
          <Autocomplete
            getOptionDisabled={(option) =>
              option === 'March' || option === 'July'
            }
            label="Select a month"
            options={options}
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('not clearable', async () => {
        const { container } = render(
          <Autocomplete
            isNotClearable={true}
            label="Select a month"
            options={options}
            value={options[0]}
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('free solo mode', async () => {
        const { container } = render(
          <Autocomplete
            freeSolo={true}
            label="Select a month"
            options={options}
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with left adornment', async () => {
        const { container } = render(
          <Autocomplete
            label="Select a month"
            options={options}
            triggerProps={{
              startAdornment: <Icon name="info" />
            }}
            value={options[0]}
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with floating label', async () => {
        const { container } = render(
          <Autocomplete
            label="Select a month"
            options={options}
            triggerProps={{
              floatingLabel: 'Month'
            }}
            value={options[0]}
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })
    })
  })
})
