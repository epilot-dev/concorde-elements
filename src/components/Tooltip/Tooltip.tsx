import {
  Provider,
  Root,
  Trigger,
  Content,
  Arrow,
  Portal
} from '@radix-ui/react-tooltip'
import classNames from 'classnames'
import type { PropsWithChildren } from 'react'
import { useEffect, useRef, useState } from 'react'

import classes from './Tooltip.module.scss'
import type { TooltipProps } from './types'

export const Tooltip = ({
  children,
  arrow = true,
  isLocal = false,
  placement,
  title,
  className,
  sideOffset = 5,
  contentClassName
}: PropsWithChildren<TooltipProps>) => {
  const portalContainer = useRef<HTMLDivElement>(null)
  const [isPortalReady, setPortalReady] = useState(false)

  // Set portal ready when local tooltip is mounted if portal container is available
  useEffect(() => {
    if (isLocal && portalContainer.current) {
      setPortalReady(true)
    }
  }, [isLocal])

  if (!title) {
    return <>{children}</>
  }

  return (
    <div className={classNames('Concorde-Tooltip', className)}>
      <Provider delayDuration={0}>
        <Root>
          <Trigger asChild className={classNames('Concorde-Tooltip__Trigger')}>
            {children}
          </Trigger>

          {isLocal && (
            <div
              className="Concorde-Tooltip__Container"
              ref={portalContainer}
            />
          )}

          {(!isLocal || isPortalReady) && (
            <Portal container={isLocal ? portalContainer.current : undefined}>
              <Content
                className={classNames(
                  'Concorde-Tooltip__Content',
                  classes.content,
                  contentClassName
                )}
                side={placement}
                sideOffset={sideOffset}
              >
                {title}
                {arrow && (
                  <Arrow
                    className={classNames(
                      'Concorde-Tooltip__Arrow',
                      classes.arrow
                    )}
                  />
                )}
              </Content>
            </Portal>
          )}
        </Root>
      </Provider>
    </div>
  )
}
