import { debounce } from 'radashi'
import { useEffect, useRef } from 'react'
import type {
  DeepPartial,
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

export const useFormHandler = <T extends Record<string, unknown>>(
  params: UseFormHandlerParams<T>
) => {
  const { handleChange, path, formProps } = params
  const form = useForm(formProps)
  const { watch, trigger } = form
  const fieldValues = watch()

  const prevValid = useRef<boolean | undefined>()

  const debouncedValidate = useRef(
    debounce(
      { delay: DEFAULT_DEBOUNCE_TIME_MS },
      async (state: DeepPartial<T>) => {
        // Update isValid with result of trigger
        trigger().then((isFormValid) => {
          if (prevValid.current === isFormValid) return

          prevValid.current = isFormValid
          handleChange(path, { ...state, _isValid: isFormValid } as T)
        })
      }
    )
  )

  useEffect(() => {
    const subscription = watch((state) => {
      handleChange(path, { ...state, _isValid: prevValid.current } as T)

      debouncedValidate.current(state)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [trigger, handleChange, path, watch])

  return {
    ...form,
    customerType: fieldValues.customerType,
    fieldValues,
    methods: form
  }
}
