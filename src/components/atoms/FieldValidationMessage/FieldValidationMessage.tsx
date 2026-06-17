import { cn } from '@utils/cn'
import { ReactNode } from 'react'

interface FieldValidationMessageProps {
  children: ReactNode
  color?: 'green' | 'red'
}

/** This component is intended to show a single error message. Usually it is placed just above a submit button. */
export const FieldValidationMessage = ({ children, color }: FieldValidationMessageProps) => {
  if (!children) return null

  return (
    <span className={cn('basis-full text-left text-sm text-red-600', color === 'green' ? 'text-green-600' : '')}>
      {children}
    </span>
  )
}
