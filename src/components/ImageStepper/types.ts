import type { IconButtonProps } from '..'
import type { MobileStepperProps } from '../MobileStepper'

export type ImageStepperProps = Omit<
  MobileStepperProps,
  'activeStep' | 'steps' | 'backButton' | 'nextButton' | 'setActiveStep'
> & {
  /**
   * The list of images to be rendered with a type restriction
   */
  images: ImageStepperImage[]
}

export type ImageStepperButtonProps = Omit<IconButtonProps, 'label'> & {
  /**
   * The onClick handler of image stepper button
   */
  onClick: () => void

  /**
   * Determines whether the image stepper button is rendered or not
   */
  isVisible: boolean

  /**
   * The class of the image stepper button
   */
  className?: string

  /**
   * The id of the image stepper button
   */
  id?: string
}

export type ImageStepperImage = {
  /**
   * The id of image to be rendered
   */
  id: string

  /**
   * The source of image to be rendered
   */
  src: string

  /**
   * The alt text image to be rendered
   */
  alt?: string
}
