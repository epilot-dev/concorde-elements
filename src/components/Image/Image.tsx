import classNames from 'classnames'
import { useReducedMotion } from 'motion/react'
import type { SyntheticEvent } from 'react'
import { forwardRef, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Skeleton } from '..'

import { AnimatedImage } from './AnimatedImage'
import classes from './Image.module.scss'
import type { ImageProps } from './types'

// Freshly-uploaded images can briefly 404 while the preview API generates the
// optimized variant and while S3 propagates the new object. Retry a few times
// with backoff before showing the error state so the image appears as soon as
// it becomes available, without forcing the user to reload the page.
const MAX_LOAD_RETRIES = 3
const RETRY_DELAYS_MS = [500, 1500, 4000]

export const Image = forwardRef<HTMLImageElement, ImageProps>((props, ref) => {
  const {
    alt = '',
    src,
    className,
    containerProps,
    onLoad,
    onError,
    fallbackSrc,
    loadingPlaceholder,
    isDefaultLoaded = true,
    errorText,
    isAnimated,
    dimension,
    ...rest
  } = props

  const { t } = useTranslation()
  const [currentSrc, setCurrentSrc] = useState(src)
  const [isLoaded, setIsLoaded] = useState(isAnimated ? false : isDefaultLoaded)
  const [hasError, setHasError] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const retryTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  )

  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    // Reset when src changes
    setCurrentSrc(src)
    setHasError(false)
    setIsLoaded(isAnimated ? false : isDefaultLoaded)
    setRetryCount(0)

    return () => {
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current)
        retryTimeoutRef.current = undefined
      }
    }
  }, [src, isAnimated, isDefaultLoaded])

  const handleLoad = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    if (!isLoaded) setIsLoaded(true)
    if (onLoad) {
      onLoad(event)
    }
  }

  const handleError = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    // If we have a fallbackSrc and we haven't tried it yet, update src.
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc)

      return
    }

    if (retryCount < MAX_LOAD_RETRIES) {
      const delay =
        RETRY_DELAYS_MS[retryCount] ??
        RETRY_DELAYS_MS[RETRY_DELAYS_MS.length - 1]

      retryTimeoutRef.current = setTimeout(() => {
        setRetryCount((count) => count + 1)
        setCurrentSrc(src)
      }, delay)

      return
    }

    setHasError(true)
    if (onError) {
      onError(event)
    }
  }

  const sharedImageProps = {
    ...rest,
    className: classNames(
      'Concorde-Image__Image',
      classes['image'],
      isLoaded && classes['image-loaded'],
      className
    ),
    onError: handleError,
    onLoad: handleLoad,
    src: currentSrc
  }

  // Remount the underlying element on retry so the browser re-fetches even
  // when the URL is unchanged (e.g. SVGs that skip the optimized variant).
  const elementKey = `${currentSrc}-${retryCount}`

  const component =
    isAnimated && !shouldReduceMotion ? (
      <AnimatedImage
        {...sharedImageProps}
        alt={alt}
        custom={isLoaded}
        key={elementKey}
        ref={ref}
      />
    ) : (
      <img {...sharedImageProps} alt={alt} key={elementKey} ref={ref} />
    )

  const aspectRatio =
    dimension?.width && dimension?.height
      ? dimension.width / dimension.height
      : undefined

  return (
    <div
      {...containerProps}
      className={classNames(
        'Concorde-Image',
        classes.root,
        containerProps?.className
      )}
      style={{
        ...containerProps?.style,
        aspectRatio
      }}
    >
      {hasError ? (
        <div
          className={classNames(
            'Concorde-Image__Error',
            classes['image-error']
          )}
        >
          <p>{errorText || t('image_block.error', 'Image failed to load')}</p>
        </div>
      ) : (
        <>
          {loadingPlaceholder || (
            <Skeleton
              className={classNames(
                'Concorde-Image__Placeholder',
                classes['image-placeholder'],
                isLoaded && classes['image-placeholder-removed']
              )}
              style={{
                aspectRatio
              }}
            />
          )}
          {component}
        </>
      )}
    </div>
  )
})

Image.displayName = 'Image'
