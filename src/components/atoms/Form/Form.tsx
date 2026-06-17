import { cn } from '@utils/cn'
import { FormEvent, ReactNode } from 'react'

interface FormProps {
  children: ReactNode
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void
  desktopFullWidth?: boolean
  desktopWidthClass?: string
}

const Form = ({ children, onSubmit, desktopFullWidth, desktopWidthClass = 'lg:w-100' }: FormProps) => (
  <form
    onSubmit={onSubmit}
    className={cn(
      'flex w-full flex-wrap gap-5 lg:max-w-[50%]',
      desktopFullWidth ? 'lg:w-full lg:max-w-full' : desktopWidthClass,
    )}
  >
    {children}
  </form>
)

export default Form
