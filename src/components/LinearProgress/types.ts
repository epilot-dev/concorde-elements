import type {
  ProgressProps as ProgressBaseProps,
  ProgressIndicatorProps as ProgressIndicatorBaseProps
} from '@radix-ui/react-progress'
import type { CSSProperties } from 'react'

export type LinearProgressProps = ProgressBaseProps & {
  /**
   * The indicator props.
   */
  indicatorProps?: ProgressIndicatorBaseProps

  /**
   * The height of the progress bar.
   */
  height?: number
}

export interface LinearProgressCSSProperties extends CSSProperties {
  '--concorde-linear-progress-height'?: string
  '--concorde-linear-progress-progress'?: string
  '--concorde-linear-progress-background-color'?: string
}
