import { ReactNode } from 'react'

export type CalloutVariants = 'info' | 'warning'

export type CalloutProps = {
  variant: CalloutVariants
  children: ReactNode
}
