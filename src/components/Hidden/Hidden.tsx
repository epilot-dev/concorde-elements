import { Fragment } from 'react/jsx-runtime'

import type { HiddenProps } from './types'

export function Hidden(props: HiddenProps) {
  const { children, showChildren = false } = props

  if (!showChildren) {
    return null
  }

  return <Fragment>{children}</Fragment>
}
