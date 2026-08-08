import React from 'react'

export function usePrevious<T>(value: T, defautValue?: T): T | undefined {
  const ref = React.useRef<T | undefined>(defautValue)

  React.useEffect(() => {
    ref.current = value
  })

  return ref.current
}
