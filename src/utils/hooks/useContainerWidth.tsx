import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
  type RefObject
} from 'react'

const ContainerWidthContext = createContext<number | undefined>(undefined)

type ContainerWidthProviderProps = {
  containerRef: RefObject<HTMLElement | null>
  children: ReactNode
}

export function ContainerWidthProvider({
  containerRef,
  children
}: ContainerWidthProviderProps) {
  const [width, setWidth] = useState<number | undefined>(undefined)

  useEffect(() => {
    const element = containerRef.current

    if (!element || typeof ResizeObserver === 'undefined') return

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]

      if (!entry) return

      const inlineSize = entry.contentBoxSize?.[0]?.inlineSize

      setWidth(inlineSize ?? entry.contentRect.width)
    })

    observer.observe(element)

    return () => observer.disconnect()
  }, [containerRef])

  return (
    <ContainerWidthContext.Provider value={width}>
      {children}
    </ContainerWidthContext.Provider>
  )
}

export function useContainerWidth(): number | undefined {
  return useContext(ContainerWidthContext)
}
