import { debounce, isEqual } from 'radashi'
import { useEffect, useRef } from 'react'
import type {
  DefaultValues,
  FieldValues,
  Path,
  UseFormProps
} from 'react-hook-form'
import { useForm } from 'react-hook-form'

const DEFAULT_DEBOUNCE_TIME_MS = 150

type UseFormHandlerParams<T extends FieldValues> = {
  handleChange: (path: string, value: T | undefined | null) => void
  path: string
  data?: T | DefaultValues<T> | undefined | null
  formProps?: UseFormProps<T>
  fields?: unknown
  isRequired?: boolean // based on schema, not on field level.
  /**
   * Reports whether a validation is in flight: `true` as soon as a change
   * schedules one, `false` once its result has been published (or it was
   * cancelled). Lets callers hold navigation until `_isValid` is current.
   */
  onValidationPendingChange?: (pending: boolean) => void
  /**
   * Whether the form-wide validation that computes `_isValid` may show its
   * errors. While `false` (the step's validation is not shown yet), it only
   * computes validity: a field it finds invalid that showed no error before
   * keeps showing none. Switching to `true` revalidates once to reveal them.
   * Defaults to `true`.
   */
  showValidationErrors?: boolean
}

/**
 * @deprecated being replaced by FormManager and associated hooks/utils
 */
export const useFormHandler = <T extends Record<string, unknown>>(
  params: UseFormHandlerParams<T>
) => {
  const {
    handleChange,
    path,
    formProps,
    onValidationPendingChange,
    showValidationErrors = true
  } = params
  const form = useForm(formProps)
  const { watch, trigger, getValues, getFieldState, clearErrors } = form
  const fieldValues = watch()

  const prevValid = useRef<boolean | undefined>()

  /*
   * Read through a ref so the subscription effect below does not depend on
   * `handleChange`. Callers commonly pass an inline function, which is a new
   * identity on every render; as an effect dependency it re-ran the effect on
   * every re-render, and the cleanup's `debounced.cancel()` then cancelled the
   * validation each change had just scheduled. `_isValid: false` was never
   * published, so a required Availability Check could be skipped by merely
   * focusing and leaving its empty zip field (STABLE360-13183).
   *
   * The ref also keeps the debounced validity write (created once) from
   * calling the first render's `handleChange`.
   */
  const handleChangeRef = useRef(handleChange)

  handleChangeRef.current = handleChange

  const onValidationPendingChangeRef = useRef(onValidationPendingChange)

  onValidationPendingChangeRef.current = onValidationPendingChange

  const showValidationErrorsRef = useRef(showValidationErrors)

  showValidationErrorsRef.current = showValidationErrors

  const invalidFieldNames = () =>
    Object.keys(getValues()).filter(
      (name) => getFieldState(name as Path<T>).invalid
    ) as Path<T>[]

  /*
   * `trigger()` validates the whole form and sets an error on every invalid
   * field, and the Address block's name fields render a field's own error
   * eagerly. Before the step's validation was shown, every untouched required
   * name field turned red: on mount (the customer-type reset of `companyName`
   * emits a change) and as soon as the customer typed into any other field
   * (STABLE360-13215). Validity is computed the same way either way, so a
   * required block still cannot be skipped.
   */
  const validate = async () => {
    if (showValidationErrorsRef.current) return trigger()

    const shownBefore = new Set<string>(invalidFieldNames())
    const isFormValid = await trigger()

    if (!showValidationErrorsRef.current) {
      const introduced = invalidFieldNames().filter(
        (name) => !shownBefore.has(name)
      )

      if (introduced.length) clearErrors(introduced)
    }

    return isFormValid
  }

  const isValidationPending = useRef(false)
  // Bumped on every change, so only the latest validation settles the pending state.
  const validationSeq = useRef(0)
  // Values as of the last change; an emission that matches them is a no-op re-write.
  const lastSeenValues = useRef<unknown>(undefined)

  const setValidationPending = (pending: boolean) => {
    if (isValidationPending.current === pending) return

    isValidationPending.current = pending
    onValidationPendingChangeRef.current?.(pending)
  }

  const debouncedValidate = useRef(
    debounce({ delay: DEFAULT_DEBOUNCE_TIME_MS }, async () => {
      const seq = validationSeq.current

      // Update isValid with result of validation
      validate()
        .then((isFormValid) => {
          if (prevValid.current === isFormValid) return

          prevValid.current = isFormValid
          /*
           * Publishes the CURRENT form values, never a snapshot captured when the
           * debounce fired. `trigger()` is async, so between the capture and this
           * write the form can have moved on — and because this write replaces the
           * whole value, every field written in between would be dropped, with the
           * `prevValid` guard above making sure no later write ever restores them.
           *
           * That is not hypothetical: the Address block applies a prefill in two
           * passes (country/zip/city first, then street/house number/district/
           * extension after a yield). Whenever the validity flip resolved between
           * the passes, the second pass' fields were silently missing from the
           * submitted data while the inputs still showed them (STABLE360-12968).
           */
          handleChangeRef.current(path, {
            ...getValues(),
            _isValid: isFormValid
          } as T)
        })
        .finally(() => {
          // A later change scheduled its own validation, which settles instead.
          if (seq === validationSeq.current) setValidationPending(false)
        })
    })
  )

  useEffect(() => {
    const debounced = debouncedValidate.current

    if (onValidationPendingChangeRef.current) {
      lastSeenValues.current ??= structuredClone(getValues())
    }

    const subscription = watch((state) => {
      /*
       * `_isValid` is stale after a real change, or while the form was never
       * validated. A re-write of already-validated values is not pending:
       * the zip field replays a deferred blur once a suggestions lookup
       * returns, setting the same zip and city again, and treating that as
       * pending closed Next at a network-timed moment and swallowed the
       * click on a valid entry.
       */
      if (
        onValidationPendingChangeRef.current &&
        (prevValid.current === undefined ||
          !isEqual(state, lastSeenValues.current))
      ) {
        lastSeenValues.current = structuredClone(state)
        validationSeq.current += 1
        setValidationPending(true)
      }

      handleChangeRef.current(path, {
        ...state,
        _isValid: prevValid.current
      } as T)

      debounced()
    })

    return () => {
      subscription.unsubscribe()
      // Unsubscribing leaves a scheduled validation, which would trigger() a torn-down form.
      debounced.cancel()
      // A cancelled validation never settles; leaving it pending would hold navigation forever.
      setValidationPending(false)
    }
  }, [trigger, getValues, path, watch])

  // Errors kept hidden above are not brought back by any later write, so
  // revalidate once when the step's validation is shown.
  const prevShowValidationErrors = useRef(showValidationErrors)

  useEffect(() => {
    const previous = prevShowValidationErrors.current

    prevShowValidationErrors.current = showValidationErrors

    if (!previous && showValidationErrors) void trigger()
  }, [showValidationErrors, trigger])

  return {
    ...form,
    customerType: fieldValues.customerType,
    fieldValues,
    methods: form
  }
}
