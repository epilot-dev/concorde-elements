import classNames from 'classnames'
import type { PropsWithChildren } from 'react'
import { useCallback, useState } from 'react'
import SwipeableViews from 'react-swipeable-views'

import { Image, MobileStepper, IconButton } from '../'

import classes from './ImageStepper.module.scss'
import type { ImageStepperButtonProps, ImageStepperProps } from './types'

export const ImageStepper = (props: ImageStepperProps) => {
  const {
    images,
    className,
    color = 'var(--concorde-primary-color)',
    style,
    id,
    ...mobileStepperProps
  } = props
  const [activeStep, setActiveStep] = useState(0)

  const updateActiveStep = useCallback((step: number) => {
    setActiveStep(step)
  }, [])

  const steps = images.length

  if (steps === 0) {
    return null
  }

  return (
    <div
      className={classNames('Concorde-ImageStepper', classes.root, className)}
      style={style}
    >
      <div
        className={classNames(
          'Concorde-ImageStepper__ImageList',
          classes['image-list']
        )}
      >
        <SwipeableViews
          className={classes['image-list']}
          enableMouseEvents
          index={activeStep}
          onChangeIndex={updateActiveStep}
        >
          {images.map((image, index) => {
            const isImageCloseToActiveStep = Math.abs(activeStep - index) <= 3

            return (
              <div
                className={classNames(
                  'Concorde-ImageStepper__ImageContainer',
                  classes['image-container']
                )}
                key={image.id}
              >
                {isImageCloseToActiveStep && (
                  <Image
                    alt={image?.alt}
                    className={classNames(
                      'Concorde-ImageStepper__Image',
                      classes['image']
                    )}
                    draggable={false}
                    src={image.src}
                  />
                )}
              </div>
            )
          })}
        </SwipeableViews>
        <ImageStepperButton
          /**
           * @todo Add translation for aria-label, make "Go back to previous step" as opposed to "Back button"
           * (page 99 of customer accessibility report)
           */
          aria-label="Back button"
          className={classNames(
            'Concorde-ImageStepper__BackButton',
            classes['back-button']
          )}
          color={color}
          id={id && `${id}_back_button`}
          isFilled
          isVisible={activeStep !== 0}
          name="arrow_back"
          onClick={() => setActiveStep((prevActiveStep) => prevActiveStep - 1)}
        />
        <ImageStepperButton
          aria-label="Next button"
          className={classNames(
            'Concorde-ImageStepper__NextButton',
            classes['next-button']
          )}
          color={color}
          id={id && `${id}_next_button`}
          isFilled
          isVisible={activeStep !== steps - 1}
          name="arrow_forward"
          onClick={() => setActiveStep((prevActiveStep) => prevActiveStep + 1)}
        />
      </div>
      <MobileStepper
        {...mobileStepperProps}
        activeStep={activeStep}
        className={classNames(
          'Concorde-ImageStepper__MobileStepper',
          classes['mobile-stepper']
        )}
        color={color}
        id={id}
        setActiveStep={setActiveStep}
        steps={steps}
      />
    </div>
  )
}

const ImageStepperButton = ({
  onClick,
  isVisible,
  children,
  className,
  id,
  ...rest
}: PropsWithChildren<ImageStepperButtonProps>) => {
  if (!isVisible) return null

  return (
    <IconButton
      {...rest}
      className={classNames(
        'Concorde-ImageStepper__Button',
        classes['button'],
        className
      )}
      id={id}
      label={children}
      onClick={onClick}
      size="1rem"
      style={{ ...rest.style, visibility: 'visible' }}
    />
  )
}
