import { createContext, useContext } from 'react'

export type InputStatus = {
  /** Shows the inputs inside in their warning state (see `isWarning`). */
  isWarning?: boolean
}

const InputStatusContext = createContext<InputStatus>({})

/**
 * Sets the status of every Input/Textarea inside, unless an input sets the
 * prop itself. Lets a wrapper that owns a field's feedback (e.g. a validation
 * warning shown under it) highlight the field without threading props through
 * each control.
 */
export const InputStatusProvider = InputStatusContext.Provider

/**
 * The warning state of an input: its own `isWarning` prop, else the nearest
 * {@link InputStatusProvider}. Never on while the input is in its error state.
 */
export const useInputWarning = ({
  isError,
  isWarning
}: {
  isError?: boolean
  isWarning?: boolean
}) => {
  const status = useContext(InputStatusContext)

  return !isError && Boolean(isWarning ?? status.isWarning)
}
