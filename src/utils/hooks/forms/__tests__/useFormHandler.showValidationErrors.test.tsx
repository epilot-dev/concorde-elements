/**
 * Regression: before the step's validation is shown, the form-wide validation
 * behind `_isValid` must not flag fields.
 *
 * `useFormHandler` validates the whole form after every write. The Address
 * block's name fields render a field's own error eagerly, so that validation
 * showed "required" on every untouched name field, on mount (the
 * customer-type reset of `companyName`) and as soon as the customer typed into
 * any other field (STABLE360-13215).
 */
import { act, renderHook } from '@testing-library/react'
import type { Resolver } from 'react-hook-form'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { useFormHandler } from '../useFormHandler'

type Person = Record<string, unknown> & {
  firstName?: string
  lastName?: string
  companyName?: string
}

/** Comfortably past the hook's internal debounce. */
const PAST_DEBOUNCE_MS = 200

const requireEveryField: Resolver<Person> = async (values) => {
  const errors = Object.fromEntries(
    Object.entries(values)
      .filter(([, value]) => !value)
      .map(([name]) => [name, { type: 'required', message: 'required' }])
  )

  return { values: Object.keys(errors).length ? {} : values, errors }
}

const renderFormHandler = (showValidationErrors?: boolean) => {
  const handleChange = vi.fn()
  const hook = renderHook(
    ({ shown }) =>
      useFormHandler<Person>({
        handleChange,
        path: 'address-block',
        showValidationErrors: shown,
        formProps: {
          defaultValues: { firstName: '', lastName: '', companyName: '' },
          resolver: requireEveryField
        }
      }),
    { initialProps: { shown: showValidationErrors } }
  )

  return { ...hook, handleChange }
}

const settle = () =>
  act(async () => {
    await vi.advanceTimersByTimeAsync(PAST_DEBOUNCE_MS)
  })

const type = async (
  form: ReturnType<typeof useFormHandler<Person>>,
  name: keyof Person & string,
  value: string
) => {
  await act(async () => {
    await form
      .register(name)
      .onChange({ target: { name, value }, type: 'change' })
  })
}

describe('useFormHandler showValidationErrors', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('keeps fields clear after a programmatic write', async () => {
    const { result, handleChange } = renderFormHandler(false)

    // What `resetField` does under the hood for a registered field.
    act(() => {
      result.current.setValue('companyName', '')
    })
    await settle()

    expect(result.current.getFieldState('firstName').invalid).toBe(false)
    expect(result.current.getFieldState('lastName').invalid).toBe(false)
    expect(result.current.getFieldState('companyName').invalid).toBe(false)
    // The block still reports itself invalid, so it cannot be skipped.
    expect(handleChange).toHaveBeenLastCalledWith(
      'address-block',
      expect.objectContaining({ _isValid: false })
    )
  })

  it('keeps the other fields clear while the customer types', async () => {
    const { result, handleChange } = renderFormHandler(false)

    await type(result.current, 'firstName', 'Jane')
    await type(result.current, 'companyName', 'epilot')
    await type(result.current, 'companyName', '')
    await settle()

    expect(result.current.getFieldState('lastName').invalid).toBe(false)
    expect(result.current.getFieldState('companyName').invalid).toBe(false)
    expect(handleChange).toHaveBeenLastCalledWith(
      'address-block',
      expect.objectContaining({ _isValid: false })
    )
  })

  it('keeps an error that was already showing', async () => {
    const { result } = renderFormHandler(false)

    act(() => {
      result.current.setError('firstName', { type: 'required' })
    })
    await type(result.current, 'companyName', 'epilot')
    await settle()

    expect(result.current.getFieldState('firstName').invalid).toBe(true)
    expect(result.current.getFieldState('lastName').invalid).toBe(false)
  })

  it('reveals every error once validation is shown', async () => {
    const { result, rerender } = renderFormHandler(false)

    await type(result.current, 'companyName', 'epilot')
    await settle()

    expect(result.current.getFieldState('firstName').invalid).toBe(false)

    rerender({ shown: true })
    await settle()

    expect(result.current.getFieldState('firstName').invalid).toBe(true)
    expect(result.current.getFieldState('lastName').invalid).toBe(true)
    expect(result.current.getFieldState('companyName').invalid).toBe(false)
  })

  it('flags every invalid field by default', async () => {
    const { result } = renderFormHandler()

    await type(result.current, 'companyName', 'epilot')
    await settle()

    expect(result.current.getFieldState('firstName').invalid).toBe(true)
  })
})
