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
import { useEffect, useMemo, useRef, useState } from 'react'

import { useStyleInjection } from '../../components/StyleInjectionProvider'
import { useIsTouchDevice } from '../../utils/hooks/useIsTouchDevice'

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
  const [open, setOpen] = useState(false)
  const isTouchDevice = useIsTouchDevice()
  const { getPortalContainer } = useStyleInjection()
  const defaultPortalContainer = useMemo(
    () => getPortalContainer(),
    [getPortalContainer]
  )

  useEffect(() => {
    if (isLocal && portalContainer.current) {
      setPortalReady(true)
    }
  }, [isLocal])

  useEffect(() => {
    if (isTouchDevice && open) {
      const timer = setTimeout(() => setOpen(false), 1_500) // wait 1.5 seconds before closing on touch devices

      return () => clearTimeout(timer)
    }

    return undefined
  }, [open, isTouchDevice])

  if (!title) {
    return <>{children}</>
  }

  return (
    <div className={classNames('Concorde-Tooltip', className)}>
      <Provider delayDuration={0}>
        <Root {...(isTouchDevice ? { open } : {})}>
          <Trigger
            asChild
            className={classNames('Concorde-Tooltip__Trigger')}
            onClick={
              isTouchDevice ? () => void setOpen((prev) => !prev) : undefined
            }
          >
            {children}
          </Trigger>

          {isLocal && (
            <div
              className="Concorde-Tooltip__Container"
              ref={portalContainer}
            />
          )}

          {(!isLocal || isPortalReady) && (
            <Portal
              container={
                isLocal ? portalContainer.current : defaultPortalContainer
              }
            >
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
