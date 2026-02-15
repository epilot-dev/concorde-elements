import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
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

      // TODO: Fix this view
      // test('time select only', async () => {
      //   const { container } = render(
      //     <DatePicker
      //       date={new Date()}
      //       id="test-id"
      //       inputProps={{
      //         label: 'Time'
      //       }}
      //       locale="en"
      //       onChange={noop}
      //     />
      //   )
      //   const results = await axe(container as HTMLElement)

      //   expect(results).toHaveNoViolations()
      // })

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

    describe('keyboard navigation', () => {
      test('check the calendar keyboard navigation focus trap', async () => {
        const user = userEvent.setup()
        const date = new Date('2025-04-14')

        const { container } = render(
          <DatePicker
            date={date}
            dateFormat="dd.MM.yyyy, HH:mm"
            id="test-id"
            inputProps={{
              label: 'Date and Time'
            }}
            isDisabled={false}
            isTimeSelectVisible={true}
            locale="en"
            onChange={noop}
            timeFormat="HH:mm"
            timeIntervals={30}
            yearDiff={30}
          />
        )

        // Tab: Focus moves visibly to the text input
        await user.tab()
        const input = screen.getByRole('textbox')

        expect(input).toHaveFocus()

        // Tab: Fous moves visibly to the button
        await user.tab()
        const calendarButton = screen.getByRole('button', {
          name: 'Open date picker'
        })

        expect(calendarButton).toHaveFocus()

        // Open the calendar
        await user.keyboard('{ }')
        let currentActiveDay = container.querySelector(
          '.Concorde-DatePicker__Day[tabindex="0"]'
        )

        // Check that the current day is focused
        expect(currentActiveDay).toHaveFocus()

        // Move to time select
        await user.tab()
        const currentActiveTime = container.querySelector(
          '.Concorde-DatePicker__Time-list-item[tabindex="0"]'
        )

        // Check that the active time is focused
        expect(currentActiveTime).toHaveFocus()

        // Move to footer
        await user.tab()

        // Check that the cancel button is focused
        expect(
          screen.getByLabelText('Cancel date selected and close the calendar')
        ).toHaveFocus()

        // Tab focus
        await user.tab()
        // Check that the ok button is focused
        expect(
          screen.getByLabelText('Accept date selected and close the calendar')
        ).toHaveFocus()

        // Tab focus
        await user.tab()

        // Check that the previous month button is focused
        expect(
          screen.getByRole('button', { name: 'Previous month' })
        ).toHaveFocus()

        // Tab focus
        await user.tab()
        // Check that the month select is focused
        const monthSelect = screen.getByRole('button', {
          name: 'April selected. Click to select month'
        })

        expect(monthSelect).toHaveFocus()

        // Tab focus
        await user.tab()
        // Check that the next month button is focused
        expect(screen.getByRole('button', { name: 'Next month' })).toHaveFocus()

        // Tab focus
        await user.tab()
        // Check that the prvious year button is focused
        expect(
          screen.getByRole('button', { name: 'Previous year' })
        ).toHaveFocus()

        // Tab focus
        await user.tab()
        // Check that the year select is focused
        const yearSelect = screen.getByRole('button', {
          name: '2025 selected. Click to select year'
        })

        expect(yearSelect).toHaveFocus()

        // Tab focus
        await user.tab()
        // Check that the next month button is focused
        expect(screen.getByRole('button', { name: 'Next year' })).toHaveFocus()

        // Tab focus
        await user.tab()
        currentActiveDay = container.querySelector(
          '.Concorde-DatePicker__Day[tabindex="0"]'
        ) as HTMLDivElement

        // Check that the current day is focused
        expect(currentActiveDay).toHaveFocus()
      })

      test('check day and time keyboard navigation', async () => {
        const user = userEvent.setup()
        const date = new Date('2025-04-14T00:00:00')

        const { container } = render(
          <DatePicker
            date={date}
            dateFormat="dd.MM.yyyy, HH:mm"
            id="test-id"
            inputProps={{
              label: 'Date and Time'
            }}
            isDisabled={false}
            isTimeSelectVisible={true}
            locale="en"
            onChange={noop}
            timeFormat="HH:mm"
            timeIntervals={30}
            yearDiff={30}
          />
        )

        // Tab: Focus moves visibly to the text input
        await user.tab()

        // Tab: Focus moves visibly to the button
        await user.tab()

        // Open the calendar
        await user.keyboard('{ }')
        let currentActiveDay = container.querySelector(
          '.Concorde-DatePicker__Day[tabindex="0"]'
        )

        // Check that the current day is focused
        expect(currentActiveDay).toHaveFocus()

        // Move to the next week
        await user.keyboard('{ArrowDown}')

        currentActiveDay = container.querySelector(
          '.Concorde-DatePicker__Day[tabindex="0"]'
        ) as HTMLDivElement

        // Check that the new active day is focused
        expect(currentActiveDay?.textContent).toBe('21')

        // Move to the previous day
        await user.keyboard('{ArrowLeft}')

        currentActiveDay = container.querySelector(
          '.Concorde-DatePicker__Day[tabindex="0"]'
        ) as HTMLDivElement

        // Check that the new active day is focused
        expect(currentActiveDay?.textContent).toBe('20')

        // Move to the previous week
        await user.keyboard('{ArrowUp}')

        currentActiveDay = container.querySelector(
          '.Concorde-DatePicker__Day[tabindex="0"]'
        ) as HTMLDivElement

        // Check that the new active day is focused
        expect(currentActiveDay?.textContent).toBe('13')

        // Move to the previous week
        await user.keyboard('{ArrowRight}')

        currentActiveDay = container.querySelector(
          '.Concorde-DatePicker__Day[tabindex="0"]'
        ) as HTMLDivElement

        // Check that the new active day is focused
        expect(currentActiveDay?.textContent).toBe('14')

        // Move to time select
        await user.tab()
        const currentActiveTime = container.querySelector(
          '.Concorde-DatePicker__Time-list-item[tabindex="0"]'
        )

        expect(currentActiveTime?.textContent).toBe('00:00')

        // Check that the active time is focused
        expect(currentActiveTime).toHaveFocus()

        // Move to the next time
        await user.keyboard('{ArrowDown}')
        // Check that the new active time is focused
        expect(screen.getByRole('option', { name: '00:30' })).toHaveFocus()

        // Move to the next time
        await user.keyboard('{ArrowDown}')
        // Check that the new active time is focused
        expect(screen.getByRole('option', { name: '01:00' })).toHaveFocus()

        // Move to the previous time
        await user.keyboard('{ArrowUp}')
        expect(screen.getByRole('option', { name: '00:30' })).toHaveFocus()
      })

      test('check header keyboard navigation', async () => {
        const user = userEvent.setup()
        const date = new Date('2025-04-14T00:00:00')

        const { container } = render(
          <DatePicker
            date={date}
            dateFormat="dd.MM.yyyy, HH:mm"
            id="test-id"
            inputProps={{
              label: 'Date and Time'
            }}
            isDisabled={false}
            isTimeSelectVisible={true}
            locale="en"
            onChange={noop}
            timeFormat="HH:mm"
            timeIntervals={30}
            yearDiff={30}
          />
        )

        // Tab: Focus moves visibly to the text input
        await user.tab()

        // Tab: Focus moves visibly to the button
        await user.tab()

        // Open the calendar
        await user.keyboard('{ }')
        const currentActiveDay = container.querySelector(
          '.Concorde-DatePicker__Day[tabindex="0"]'
        )

        // Check that the current day is focused
        expect(currentActiveDay).toHaveFocus()

        // Move to time select
        await user.tab()

        // Move to footer
        await user.tab()

        // Move to OK button
        await user.tab()

        // Move to Previous month
        await user.tab()

        // Check that the previous month button is focused
        expect(
          screen.getByRole('button', { name: 'Previous month' })
        ).toHaveFocus()

        // Tab focus
        await user.tab()
        // Check that the month select is focused
        const monthSelect = screen.getByRole('button', {
          name: 'April selected. Click to select month'
        })

        expect(monthSelect).toHaveFocus()

        // Click on the month select
        await user.keyboard('{ }')
        // Expect the April to be selected
        expect(screen.getByRole('option', { name: 'April' })).toHaveFocus()

        // Move to the next month
        await user.keyboard('{ArrowDown}')
        expect(screen.getByRole('option', { name: 'May' })).toHaveFocus()

        // Move to the next month
        await user.keyboard('{ArrowDown}')
        expect(screen.getByRole('option', { name: 'June' })).toHaveFocus()

        // Escape closes it month select.
        await user.keyboard('{Escape}')

        // Check that the month select is closed
        expect(
          screen.queryByRole('button', {
            name: 'April selected. Click to select month'
          })
        ).toHaveFocus()
        expect(
          screen.queryByRole('option', { name: 'May' })
        ).not.toBeInTheDocument()

        // Open the month select again
        await user.keyboard('{ }')

        // Move to the previous month
        await user.keyboard('{ArrowUp}')
        expect(screen.getByRole('option', { name: 'March' })).toHaveFocus()

        // Select the previous month
        await user.keyboard('{ }')

        // Check that the month select is closed
        expect(
          screen.queryByRole('button', {
            name: 'March selected. Click to select month'
          })
        ).toHaveFocus()
        expect(
          screen.queryByRole('option', { name: 'April' })
        ).not.toBeInTheDocument()

        // Tab focus
        await user.tab()
        // Check that the next month button is focused
        expect(screen.getByRole('button', { name: 'Next month' })).toHaveFocus()

        // Tab focus
        await user.tab()
        // Check that the prvious year button is focused
        expect(
          screen.getByRole('button', { name: 'Previous year' })
        ).toHaveFocus()

        // Tab focus
        await user.tab()
        // Check that the year select is focused
        const yearSelect = screen.getByRole('button', {
          name: '2025 selected. Click to select year'
        })

        expect(yearSelect).toHaveFocus()

        // Click on the year select
        await user.keyboard('{ }')
        // Expect the 2025 to be selected
        expect(screen.getByRole('option', { name: '2025' })).toHaveFocus()

        // Move to the next year
        await user.keyboard('{ArrowDown}')
        expect(screen.getByRole('option', { name: '2026' })).toHaveFocus()

        // Move to the next year
        await user.keyboard('{ArrowDown}')
        expect(screen.getByRole('option', { name: '2027' })).toHaveFocus()

        // Escape closes it year select.
        await user.keyboard('{Escape}')

        // Check that the year select is closed
        expect(
          screen.queryByRole('button', {
            name: '2025 selected. Click to select year'
          })
        ).toHaveFocus()
        expect(
          screen.queryByRole('option', { name: '2026' })
        ).not.toBeInTheDocument()

        // Open the year select again
        await user.keyboard('{ }')

        // Move to the previous year
        await user.keyboard('{ArrowUp}')
        expect(screen.getByRole('option', { name: '2024' })).toHaveFocus()

        // Select the previous year
        await user.keyboard('{ }')

        // Check that the year select is closed
        expect(
          screen.queryByRole('button', {
            name: '2024 selected. Click to select year'
          })
        ).toHaveFocus()
        expect(
          screen.queryByRole('option', { name: '2025' })
        ).not.toBeInTheDocument()

        // Tab focus
        await user.tab()
        // Check that the next month button is focused
        expect(screen.getByRole('button', { name: 'Next year' })).toHaveFocus()
      })
    })
  })
})
