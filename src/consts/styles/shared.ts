import { cn } from '@utils/cn'

const defaultContainerClass = 'mx-auto max-w-200 text-center flex flex-wrap gap-5 *:basis-full'

export const sharedStyles = {
  /** Tailwind classes for a typical content block. */
  defaultContainer: defaultContainerClass,
  wideContainer: cn(defaultContainerClass, 'max-w-300'),
}
