import classNames from 'classnames'
import { useReducedMotion } from 'motion/react'
import type { SyntheticEvent } from 'react'
import { useEffect, useState, forwardRef } from 'react'

import { AnimatedImage } from './AnimatedImage'
import classes from './Image.module.scss'
import type { ImageProps } from './types'

export const Image = forwardRef<HTMLImageElement, ImageProps>((props, ref) => {
  const {
    alt,
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
    ...rest
  } = props

  const [isLoaded, setIsLoaded] = useState(isAnimated ? false : isDefaultLoaded)
  const [hasError, setHasError] = useState(false)

  const shouldReduceMotion = useReducedMotion()

  const handleLoad = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    if (!isLoaded) setIsLoaded(true)
    if (onLoad) {
      onLoad(event)
    }
  }

  const handleError = (event: SyntheticEvent<HTMLImageElement, Event>) => {
    setHasError(true)
    if (onError) {
      onError(event)
    }
  }

  useEffect(() => {
    // Reset when src changes
    setHasError(false)
  }, [src])

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
    src: src || fallbackSrc
  }

  const component =
    isAnimated && !shouldReduceMotion ? (
      <AnimatedImage {...sharedImageProps} custom={isLoaded} ref={ref} />
    ) : (
      <img {...sharedImageProps} alt={alt} ref={ref} />
    )

  return (
    <div
      {...containerProps}
      className={classNames(
        'Concorde-Image',
        classes.root,
        containerProps?.className
      )}
    >
      {!isLoaded && !hasError && (
        <>
          {loadingPlaceholder || (
            <div
              className={classNames(
                'Concorde-Image__Placeholder',
                classes['image-placeholder']
              )}
            />
          )}
        </>
      )}
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
        component
      )}
    </div>
  )
})

Image.displayName = 'Image'
