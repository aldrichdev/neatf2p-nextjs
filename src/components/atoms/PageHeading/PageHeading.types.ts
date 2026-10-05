import { ReactNode } from 'react'

export type PageHeadingProps = {
  /** The text of the heading. */
  children: string | string[] | ReactNode
  className?: string
}
