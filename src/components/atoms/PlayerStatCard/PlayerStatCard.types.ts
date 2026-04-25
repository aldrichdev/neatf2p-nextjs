import { ReactNode } from 'react'

export type PlayerStatCardProps = {
  /** The text that appears above the statistic value. */
  label: string
  /** The statistic value, provided as a child of the component. */
  children: string | ReactNode
  /** The text that appears below the statistic value. */
  footnote: string
  /** If the statistic value is a rank. */
  isRank?: boolean
}
