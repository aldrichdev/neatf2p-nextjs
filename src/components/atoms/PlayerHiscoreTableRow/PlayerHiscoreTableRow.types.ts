import { HiscoreType } from '@globalTypes/Hiscores/HiscoreType'

export type PlayerHiscoreTableRowProps = {
  skill: HiscoreType
  rank: number
  level: number
  /** Raw EXP value from the database. */
  exp: number
}
