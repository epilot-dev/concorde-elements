import { useInjectCss } from '../../utils/useInjectCss'

import type { ConcordeTheme, JourneyDesignTokens } from './types'
import { convertThemeToCssVariables } from './utils'

export const useGlobalStyles = ({
  theme,
  designTokens
}: {
  theme: ConcordeTheme
  designTokens: JourneyDesignTokens
}) => {
  const cssString = convertThemeToCssVariables(theme, designTokens)

  useInjectCss('concorde-globals', cssString)
}
