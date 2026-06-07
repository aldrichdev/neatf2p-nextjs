import { cn } from '@utils/cn'
import { FormEvent, ReactNode } from 'react'

interface FormProps {
  children: ReactNode
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void
  desktopFullWidth?: boolean
}

const Form = ({ children, onSubmit, desktopFullWidth }: FormProps) => (
  <form
    onSubmit={onSubmit}
    className={cn('flex w-full flex-wrap gap-5 lg:max-w-[40%]', desktopFullWidth ? 'lg:w-full lg:max-w-full' : '')}
  >
    {children}
  </form>
)

export default Form
