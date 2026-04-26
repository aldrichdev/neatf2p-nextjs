import { StatisticCardProps } from '@atoms/StatisticCard/StatisticCard.types'

export type PlayerHiscoreHeaderProps = {
  isLoading: boolean
  accountName: string
  lastLoginMillis: number | undefined
  statCards: StatisticCardProps[]
}
