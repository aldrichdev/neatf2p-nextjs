import { PlayerHiscoreRow } from '@globalTypes/Hiscores/PlayerHiscoreRow'

export type PlayerHiscoreHeaderProps = {
  isLoading: boolean
  accountName: string
  lastLoginMillis: number | undefined
  overallHiscoreRecord: PlayerHiscoreRow | undefined
}
