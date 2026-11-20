import { createContext, useContext, useMemo, type ReactNode } from 'react'

import { PORTAL_CONTAINER_ID, STYLE_INJECTION_CONTAINER_ID } from './constants'

interface StyleInjectionContextValue {
  /** Returns the container where styles should be injected */
  getStyleContainer: () => HTMLElement
  /** Returns the container where portal dialogs should be rendered */
  getPortalContainer: () => HTMLElement | undefined
}

const defaultContext: StyleInjectionContextValue = {
  getStyleContainer: () => document.head,
  getPortalContainer: () => undefined
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
      },
      getPortalContainer: () => {
        if (shadowRoot) {
          return shadowRoot.querySelector(
            `#${PORTAL_CONTAINER_ID}`
          ) as HTMLElement
        }

        return undefined
      }
    }
  }, [shadowRoot])

  return (
    <StyleInjectionContext.Provider value={value}>
      {children}
    </StyleInjectionContext.Provider>
  )
}
