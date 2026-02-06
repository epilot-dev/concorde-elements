import classNames from 'classnames'
import { useReducedMotion } from 'motion/react'
import type { SyntheticEvent } from 'react'
import { forwardRef, useEffect, useState } from 'react'

import { Skeleton } from '..'

import { AnimatedImage } from './AnimatedImage'
import classes from './Image.module.scss'
import type { ImageProps } from './types'

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

  const [currentSrc, setCurrentSrc] = useState(src)
  const [isLoaded, setIsLoaded] = useState(isAnimated ? false : isDefaultLoaded)
  const [hasError, setHasError] = useState(false)

  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    // Reset when src changes
    setCurrentSrc(src)
    setHasError(false)
    setIsLoaded(isAnimated ? false : isDefaultLoaded)
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

  const component =
    isAnimated && !shouldReduceMotion ? (
      <AnimatedImage
        {...sharedImageProps}
        alt={alt}
        custom={isLoaded}
        ref={ref}
      />
    ) : (
      <img {...sharedImageProps} alt={alt} ref={ref} />
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
          <p>{errorText || 'Image failed to load'}</p>
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
