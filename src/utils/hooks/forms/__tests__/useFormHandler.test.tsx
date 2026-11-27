/**
 * Regression: the validity commit must publish the CURRENT form values.
 *
 * `useFormHandler` writes the whole block value on every change, plus one extra
 * write when `trigger()` flips the form's validity. That validity write used to
 * publish the values captured when the debounce fired. `trigger()` is async, so
 * anything written while it was in flight was dropped by that write — and the
 * `prevValid` guard meant no later write ever restored it.
 *
 * The Address block hits this every time: its prefill applies country/zip/city
 * first and street/house number/district/extension after a yield, so a validity
 * flip landing between the two passes dropped the second pass from the stored
 * value while the inputs kept showing it (STABLE360-12968).
 */
import { act, renderHook } from '@testing-library/react'
import type { Resolver } from 'react-hook-form'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { useFormHandler } from '../useFormHandler'

type Address = Record<string, unknown> & {
  streetName?: string
  houseNumber?: string
}

/** Comfortably past the hook's internal debounce. */
const PAST_DEBOUNCE_MS = 200

describe('useFormHandler', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('publishes the values written while validation was in flight', async () => {
    let releaseValidation: (() => void) | undefined

    // Stands in for a slow validation: resolves only when the test says so, so
    // a write can be placed inside the `trigger()` window deterministically.
    const resolver: Resolver<Address> = vi.fn(async (values) => {
      await new Promise<void>((resolve) => {
        releaseValidation = resolve
      })

      return { values, errors: {} }
    }) as unknown as Resolver<Address>

    const handleChange = vi.fn()

    const { result } = renderHook(() =>
      useFormHandler<Address>({
        handleChange,
        path: 'address-block',
        formProps: { defaultValues: {}, resolver }
      })
    )

    // First prefill pass.
    act(() => {
      result.current.setValue('streetName', 'Im alten Ohl')
    })

    // The debounce fires and starts validating the form…
    await act(async () => {
      await vi.advanceTimersByTimeAsync(PAST_DEBOUNCE_MS)
    })

    // …and the second prefill pass lands while that validation is in flight.
    act(() => {
      result.current.setValue('houseNumber', '12')
    })

    // Validation resolves, committing the validity flip.
    await act(async () => {
      releaseValidation?.()
      await vi.advanceTimersByTimeAsync(0)
    })

    const [lastPath, lastValue] = handleChange.mock.calls.at(-1) ?? []

    expect(lastPath).toBe('address-block')
    // The validity write is the last one, so it must not undo the second pass.
    expect(lastValue).toMatchObject({
      streetName: 'Im alten Ohl',
      houseNumber: '12',
      _isValid: true
    })
  })

  it('never publishes a value without a field the form still holds', async () => {
    let releaseValidation: (() => void) | undefined

    const resolver: Resolver<Address> = vi.fn(async (values) => {
      await new Promise<void>((resolve) => {
        releaseValidation = resolve
      })

      return { values, errors: {} }
    }) as unknown as Resolver<Address>

    const handleChange = vi.fn()

    const { result } = renderHook(() =>
      useFormHandler<Address>({
        handleChange,
        path: 'address-block',
        formProps: { defaultValues: {}, resolver }
      })
    )

    act(() => {
      result.current.setValue('streetName', 'Im alten Ohl')
    })

    await act(async () => {
      await vi.advanceTimersByTimeAsync(PAST_DEBOUNCE_MS)
    })

    act(() => {
      result.current.setValue('houseNumber', '12')
    })

    await act(async () => {
      releaseValidation?.()
      await vi.advanceTimersByTimeAsync(PAST_DEBOUNCE_MS)
    })

    // Every write made after the field was set carries it: a write that drops a
    // field the form holds is the whole failure mode, wherever it lands in the
    // sequence.
    const writesAfterHouseNumber = handleChange.mock.calls.filter(
      ([, value]) => value && 'streetName' in value
    )

    expect(writesAfterHouseNumber.length).toBeGreaterThan(0)
    expect(
      writesAfterHouseNumber
        .slice(writesAfterHouseNumber.findIndex(([, v]) => 'houseNumber' in v))
        .every(([, value]) => value.houseNumber === '12')
    ).toBe(true)
  })

  /*
   * Regression (STABLE360-13183): callers such as `AvailabilityCheckForm` pass
   * an inline `handleChange`, a new function on every render. While it was an
   * effect dependency, every re-render re-ran the effect and its cleanup
   * cancelled the validation the change had just scheduled, so `_isValid: false`
   * was never published and a required block could be skipped.
   */
  it('publishes the validity even when handleChange changes on every render', async () => {
    const handleChange = vi.fn()

    const { result } = renderHook(() => {
      const form = useFormHandler<Address>({
        // A fresh identity per render, exactly like an inline arrow.
        handleChange: (path, value) => handleChange(path, value),
        path: 'availability-block',
        formProps: { defaultValues: { countryCode: 'DE' } }
      })

      form.register('zipCode', { required: true })

      return form
    })

    act(() => {
      result.current.setValue('zipCode', '')
    })

    await act(async () => {
      await vi.advanceTimersByTimeAsync(PAST_DEBOUNCE_MS)
    })

    expect(handleChange.mock.calls.at(-1)?.[1]).toMatchObject({
      _isValid: false
    })
  })

  it('publishes the validity through the latest handleChange', async () => {
    const firstHandleChange = vi.fn()
    const latestHandleChange = vi.fn()

    const { result, rerender } = renderHook(
      ({ handleChange }) => {
        const form = useFormHandler<Address>({
          handleChange,
          path: 'availability-block',
          formProps: { defaultValues: {} }
        })

        form.register('zipCode', { required: true })

        return form
      },
      { initialProps: { handleChange: firstHandleChange } }
    )

    rerender({ handleChange: latestHandleChange })

    act(() => {
      result.current.setValue('zipCode', '')
    })

    await act(async () => {
      await vi.advanceTimersByTimeAsync(PAST_DEBOUNCE_MS)
    })

    expect(firstHandleChange).not.toHaveBeenCalled()
    expect(latestHandleChange.mock.calls.at(-1)?.[1]).toMatchObject({
      _isValid: false
    })
  })

  it('does not validate after unmount', async () => {
    const handleChange = vi.fn()

    const { result, unmount } = renderHook(() =>
      useFormHandler<Address>({
        handleChange,
        path: 'availability-block',
        formProps: { defaultValues: {} }
      })
    )

    act(() => {
      result.current.setValue('streetName', 'Im alten Ohl')
    })

    const callsBeforeUnmount = handleChange.mock.calls.length

    unmount()

    await act(async () => {
      await vi.advanceTimersByTimeAsync(PAST_DEBOUNCE_MS)
    })

    expect(handleChange).toHaveBeenCalledTimes(callsBeforeUnmount)
  })
})
