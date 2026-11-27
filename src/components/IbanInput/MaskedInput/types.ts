import type { Props as InputMaskProps } from 'react-input-mask'

import type { InputProps } from '../..'

export type MaskedInputProps = InputMaskProps & {
  /*
   * The props of the nested Input
   */
  inputProps: InputProps
}
