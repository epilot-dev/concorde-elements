import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { describe, expect, test, vi } from 'vitest'
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

    describe('keyboard navigation', () => {
      test('textbox keyboard navigation', async () => {
        /**
         * From: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-autocomplete-list/
         */

        const user = userEvent.setup()

        render(<Autocomplete label="Select a month" options={options} />)

        // Tab: Focus moves visibly to the text input
        await user.tab()
        const input = screen.getByRole('combobox')

        expect(input).toHaveFocus()

        // Arrow-down: Opens the listbox
        await user.keyboard('{ArrowDown}')
        expect(screen.getByRole('listbox')).toBeInTheDocument()

        // Check that first option is visible
        expect(screen.getByText(options[0])).toBeInTheDocument()

        // DOM focus should remain on the textbox
        expect(input).toHaveFocus()

        // Arrow-down again: Moves to the next option
        await user.keyboard('{ArrowDown}')

        // Enter: The textbox value is set to the content of the selected option and listbox closes
        await user.keyboard('{Enter}')
        expect(input).toHaveValue(options[0])
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument()

        // Arrow-down with a value: Opens the listbox again
        await user.keyboard('{ArrowDown}')
        expect(screen.getByRole('listbox')).toBeInTheDocument()

        // Escape: If the listbox is displayed, closes it.
        await user.keyboard('{Escape}')
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument()

        // Escape: If the listbox is not displayed, clears the textbox
        await user.keyboard('{Escape}')
        expect(input).toHaveValue('')
      })

      test('Tab commits the arrow-highlighted option and advances focus', async () => {
        const user = userEvent.setup()
        const onChange = vi.fn()

        render(
          <Autocomplete
            label="Select a month"
            onChange={onChange}
            options={options}
          />
        )

        // Focus the input
        await user.tab()
        const input = screen.getByRole('combobox')

        expect(input).toHaveFocus()

        // Arrow-down opens the listbox (highlighted index stays -1)
        await user.keyboard('{ArrowDown}')
        expect(screen.getByRole('listbox')).toBeInTheDocument()

        // Two more arrow-downs highlight the second option ('February', index 1)
        await user.keyboard('{ArrowDown}')
        await user.keyboard('{ArrowDown}')
        expect(input).toHaveAttribute(
          'aria-activedescendant',
          expect.stringContaining('-option-1')
        )

        // Tab: confirms the highlighted (2nd) option and moves focus onward
        await user.tab()

        // The 2nd option is applied — asserting options[1] (not options[0])
        // guards against regressing to the "always select index 0" behaviour
        expect(onChange).toHaveBeenCalledWith(
          expect.anything(),
          options[1],
          'selectOption',
          { option: options[1] }
        )
        expect(input).toHaveValue(options[1])
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
        expect(input).not.toHaveFocus()
      })

      test('Tab without a highlighted option does not auto-select', async () => {
        const user = userEvent.setup()
        const onChange = vi.fn()

        render(
          <Autocomplete
            freeSolo
            label="Select a month"
            onChange={onChange}
            options={options}
          />
        )

        // Focus the input and type to open the list, but never arrow into it
        await user.tab()
        const input = screen.getByRole('combobox')

        await user.keyboard('Ma')

        // No highlighted option => Tab must not force a selection
        await user.tab()

        expect(onChange).not.toHaveBeenCalled()
        expect(input).not.toHaveFocus()
      })
    })

    test('for screen readers: the purpose of the textbox is explicitly stated with the label', async () => {
      const label = 'Select a month'

      render(<Autocomplete label={label} options={options} />)

      const input = screen.getByLabelText(label)

      expect(input).toBeInTheDocument()
    })
  })

  describe('isLoadingMore', () => {
    test('renders a trailing loading-more skeleton when isLoadingMore and options are present', () => {
      render(
        <Autocomplete
          isLoadingMore
          open
          options={['Alpha', 'Beta']}
          value={null}
        />
      )

      expect(
        screen.getByTestId('autocomplete-loading-more')
      ).toBeInTheDocument()
    })

    test('does not render the loading-more skeleton when isLoadingMore is false', () => {
      render(<Autocomplete open options={['Alpha', 'Beta']} value={null} />)

      expect(
        screen.queryByTestId('autocomplete-loading-more')
      ).not.toBeInTheDocument()
    })
  })
})
