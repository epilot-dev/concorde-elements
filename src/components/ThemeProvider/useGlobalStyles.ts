import { useInjectCss } from '../../utils/useInjectCss'

import type { ConcordeTheme, JourneyDesignTokens } from './types'
import { convertThemeToCssVariables } from './utils'

export const useGlobalStyles = ({
  theme,
  designTokens,
  darkMode
}: {
  theme: ConcordeTheme
  designTokens: JourneyDesignTokens
  darkMode?: boolean
}) => {
  const cssString = convertThemeToCssVariables(theme, designTokens, darkMode)

  useInjectCss('concorde-globals', cssString)
}
