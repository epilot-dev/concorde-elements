import { render } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import { axe } from 'vitest-axe'
import 'vitest-axe/extend-expect'

import { DatePicker } from '../DatePicker'

const noop = () => {}

describe('DatePicker', () => {
  describe('accessibility', () => {
    describe('axe static tests', () => {
      test('default datepicker', async () => {
        const { container } = render(
          <DatePicker
            date={new Date()}
            dateFormat="dd.MM.yyyy, HH:mm"
            id="test-id"
            inputProps={{
              label: 'Date and Time'
            }}
            isDisabled={false}
            isOnlyTimeSelect={false}
            isTimeSelectVisible={true}
            locale="en"
            onChange={noop}
            timeFormat="HH:mm"
            timeIntervals={30}
            yearDiff={30}
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('date select only', async () => {
        const { container } = render(
          <DatePicker
            date={new Date()}
            id="test-id"
            inputProps={{
              label: 'Date'
            }}
            isTimeSelectVisible={false}
            locale="en"
            onChange={noop}
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('time select only', async () => {
        const { container } = render(
          <DatePicker
            date={new Date()}
            id="test-id"
            inputProps={{
              label: 'Time'
            }}
            isOnlyTimeSelect={true}
            locale="en"
            onChange={noop}
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('disabled state', async () => {
        const { container } = render(
          <DatePicker
            date={new Date()}
            id="test-id"
            inputProps={{
              label: 'Date and Time'
            }}
            isDisabled={true}
            locale="en"
            onChange={noop}
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with label', async () => {
        const { container } = render(
          <DatePicker
            date={new Date()}
            id="test-id"
            inputProps={{
              label: 'Date Picker'
            }}
            locale="en"
            onChange={noop}
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('required input', async () => {
        const { container } = render(
          <DatePicker
            date={new Date()}
            id="test-id"
            inputProps={{
              label: 'Date Picker',
              isRequired: true
            }}
            locale="en"
            onChange={noop}
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with helper text', async () => {
        const { container } = render(
          <DatePicker
            date={new Date()}
            id="test-id"
            inputProps={{
              label: 'Date Picker',
              helperText: 'Helper text'
            }}
            locale="en"
            onChange={noop}
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('error state', async () => {
        const { container } = render(
          <DatePicker
            date={new Date()}
            id="test-id"
            inputProps={{
              label: 'Date Picker',
              isRequired: true,
              isError: true
            }}
            locale="en"
            onChange={noop}
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with date range', async () => {
        const today = new Date()
        const maxDate = new Date(today)

        maxDate.setDate(today.getDate() + 3)

        const { container } = render(
          <DatePicker
            date={today}
            id="test-id"
            inputProps={{
              label: 'Date Picker',
              isRequired: true
            }}
            locale="en"
            maxDate={maxDate}
            minDate={today}
            onChange={noop}
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with disabled weekends', async () => {
        const { container } = render(
          <DatePicker
            date={new Date()}
            disableDays={[0, 6]}
            id="test-id"
            inputProps={{
              label: 'Date Picker',
              isRequired: true
            }}
            locale="en"
            onChange={noop}
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })

      test('with EN locale', async () => {
        const { container } = render(
          <DatePicker
            date={new Date()}
            id="test-id"
            inputProps={{
              label: 'Date Picker'
            }}
            locale="en"
            onChange={noop}
          />
        )
        const results = await axe(container as HTMLElement)

        expect(results).toHaveNoViolations()
      })
    })
  })
})
