import { createContext, useContext, useMemo, type ReactNode } from 'react'

import { STYLE_INJECTION_CONTAINER_ID } from './constants'

interface StyleInjectionContextValue {
  /** Returns the container where styles should be injected */
  getStyleContainer: () => HTMLElement
}

const defaultContext: StyleInjectionContextValue = {
  getStyleContainer: () => document.head
}

export const StyleInjectionContext =
  createContext<StyleInjectionContextValue>(defaultContext)

export const useStyleInjection = () => useContext(StyleInjectionContext)

interface StyleInjectionProviderProps {
  children: ReactNode
  shadowRoot?: ShadowRoot | null
}

export const StyleInjectionProvider = ({
  children,
  shadowRoot
}: StyleInjectionProviderProps) => {
  const value = useMemo(() => {
    return {
      getStyleContainer: () => {
        if (shadowRoot) {
          return (
            (shadowRoot.querySelector(
              `#${STYLE_INJECTION_CONTAINER_ID}`
            ) as HTMLElement) ?? document.head
          )
        }

        return document.head
      }
    }
  }, [shadowRoot])

  return (
    <StyleInjectionContext.Provider value={value}>
      {children}
    </StyleInjectionContext.Provider>
  )
}
