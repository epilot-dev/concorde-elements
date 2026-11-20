import classNames from 'classnames'
import { forwardRef } from 'react'

import { Button } from '..'

import classes from './MobileStepper.module.scss'
import type { MobileStepperCSSProperties, MobileStepperProps } from './types'

export const MobileStepper = forwardRef<HTMLDivElement, MobileStepperProps>(
  (props, ref) => {
    const {
      steps,
      activeStep,
      setActiveStep,
      nextButton,
      backButton,
      className,
      position = 'static',
      style,
      variant = 'dots',
      color,
      backgroundColor,
      stepBgColor,
      activeStepBgColor,
      ...rest
    } = props

    const customColors: MobileStepperCSSProperties = {
      '--concorde-mobile-stepper-color': color,
      '--concorde-mobile-stepper-background-color': backgroundColor,
      '--concorde-mobile-stepper-step-background-color': stepBgColor,
      '--concorde-mobile-stepper-active-step-background-color':
        activeStepBgColor
    }

    const customStyles = {
      ...style,
      ...customColors
    }

    return (
      <div
        className={classNames(
          'Concorde-MobileStepper',
          classes.root,
          className,
          {
            [classes['position-top']]: position === 'top',
            [classes['position-bottom']]: position === 'bottom'
          }
        )}
        ref={ref}
        style={customStyles}
        {...rest}
      >
        <div
          className={classNames(
            'Concorde-MobileStepper__Button',
            'Concorde-MobileStepper__BackButton',
            classes['button']
          )}
        >
          {backButton}
        </div>
        <div
          className={classNames('Concorde-MobileStepper__Steps', {
            [classes['variant-dots']]: variant === 'dots'
          })}
        >
          <StepperVariant
            activeStep={activeStep}
            setActiveStep={setActiveStep}
            steps={steps}
            variant={variant}
          />
        </div>
        <div
          className={classNames(
            'Concorde-MobileStepper__Button',
            'Concorde-MobileStepper__NextButton',
            classes['button']
          )}
        >
          {nextButton}
        </div>
      </div>
    )
  }
)

function StepperVariant({
  variant,
  steps,
  activeStep,
  setActiveStep
}: Pick<
  MobileStepperProps,
  'variant' | 'steps' | 'activeStep' | 'setActiveStep'
>) {
  const stepList = Array.from({ length: steps })

  if (variant === 'dots') {
    return (
      <>
        {stepList.map((_, index) => {
          const isActiveStep = index === activeStep

          return (
            <Button
              aria-label={`Step ${index + 1} button`}
              className={classNames(
                'Concorde-MobileStepper__Step',
                'Concorde-MobileStepper__Step-Dots',
                classes['step-dots'],
                isActiveStep && 'Concorde-MobileStepper__Step-Dots--active',
                isActiveStep && classes['step-dots-active']
              )}
              key={index}
              label="" // Empty label
              onClick={() => {
                if (setActiveStep) setActiveStep(index)
              }}
              variant="bare"
            />
          )
        })}
      </>
    )
  }

  if (variant === 'progress') {
    // TODO: Create Linear Progress Component
  }

  return (
    <div className={classNames('Concorde-MobileStepper__Step')}>
      {activeStep + 1} / {steps}
    </div>
  )
}

MobileStepper.displayName = 'MobileStepper'
