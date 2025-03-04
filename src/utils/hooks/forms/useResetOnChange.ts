import { useEffect } from 'react'
import type {
  UseFormResetField,
  Path,
  PathValue,
  FieldValues
} from 'react-hook-form'

type UseResetFormOnChangeParams<T> = {
  name: Path<T>
  watch: PathValue<T, Path<T>> | undefined | string | number
  value: PathValue<T, Path<T>> | undefined
}
/**
 * Watches a given value, and resets it to the passed value for a fieldname
 * @param resetField function from react-hook-form
 * @param params.name field name to reset
 * @param params.watch value to watch
 * @param params.value value to set if watched value changes
 *
 */
export const useResetOnChange = <T extends FieldValues>(
  resetField: UseFormResetField<T> | undefined,
  params: UseResetFormOnChangeParams<T>
) => {
  const { name, watch, value } = params

  useEffect(() => {
    if (!resetField) {
      return
    }

    resetField(name, {
      defaultValue: value
    })
  }, [watch])
}
