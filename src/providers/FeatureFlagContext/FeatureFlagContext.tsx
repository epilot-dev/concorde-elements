import type { ComponentProps } from 'react'
import { createContext, useContext } from 'react'

type FeatureFlagContextValue = Record<string, unknown>

const FeatureFlagContext = createContext<FeatureFlagContextValue | undefined>(
  undefined
)

// Custom hook to use the feature flags
export const useFlags = () => {
  const context = useContext(FeatureFlagContext)

  if (!context) {
    throw new Error(
      'useFlags should only be used inside a <FeatureFlagContext.Provider>'
    )
  }

  return context
}

type FeatureFlagProviderProps = Omit<
  ComponentProps<typeof FeatureFlagContext.Provider>,
  'value'
> & {
  featureFlags?: Record<string, unknown>
}

/**
 * Provider to fetch and provide feature flags from LaunchDarkly to the app
 * Requires this proxy API as LD is a US service
 */
export const FeatureFlagProvider = ({
  featureFlags,
  ...props
}: FeatureFlagProviderProps) => {
  return <FeatureFlagContext.Provider {...props} value={featureFlags || {}} />
}
