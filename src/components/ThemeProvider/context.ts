import { createContext } from 'react'

import type { ConcordeTheme } from './types'

export const ThemeContext = createContext<ConcordeTheme | undefined>(undefined)
