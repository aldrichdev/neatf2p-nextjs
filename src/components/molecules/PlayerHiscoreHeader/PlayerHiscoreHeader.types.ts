import { PlayerStatCardProps } from '@atoms/PlayerStatCard/PlayerStatCard.types'

export type PlayerHiscoreHeaderProps = {
  isLoading: boolean
  accountName: string
  lastLoginMillis: number | undefined
  statCards: PlayerStatCardProps[]
}
