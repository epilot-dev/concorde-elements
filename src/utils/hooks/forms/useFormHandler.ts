import { debounce } from 'radashi'
import { useEffect, useRef } from 'react'
import type {
  DefaultValues,
  FieldValues,
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
}

/**
 * @deprecated being replaced by FormManager and associated hooks/utils
 */
export const useFormHandler = <T extends Record<string, unknown>>(
  params: UseFormHandlerParams<T>
) => {
  const { handleChange, path, formProps } = params
  const form = useForm(formProps)
  const { watch, trigger, getValues } = form
  const fieldValues = watch()

  const prevValid = useRef<boolean | undefined>()

  const debouncedValidate = useRef(
    debounce({ delay: DEFAULT_DEBOUNCE_TIME_MS }, async () => {
      // Update isValid with result of trigger
      trigger().then((isFormValid) => {
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
        handleChange(path, { ...getValues(), _isValid: isFormValid } as T)
      })
    })
  )

  useEffect(() => {
    const debounced = debouncedValidate.current

    const subscription = watch((state) => {
      handleChange(path, { ...state, _isValid: prevValid.current } as T)

      debounced()
    })

    return () => {
      subscription.unsubscribe()
      // Unsubscribing leaves a scheduled validation, which would trigger() a torn-down form.
      debounced.cancel()
    }
  }, [trigger, handleChange, path, watch])

  return {
    ...form,
    customerType: fieldValues.customerType,
    fieldValues,
    methods: form
  }
}
