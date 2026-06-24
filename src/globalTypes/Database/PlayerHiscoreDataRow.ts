import { PlayerHiscoresSortField } from './PlayerHiscoresSortField'

export type PlayerHiscoreDataRow = PlayerHiscoresSortField & {
  username: string
  /** Login date in milliseconds since Unix epoch. */
  login_date: number
  overallRank: number
  skill_total: number
  totalXp: number
  hitsRank: number
  hits: number
  hitsxp: number
  rangedRank: number
  ranged: number
  rangedxp: number
  prayerRank: number
  prayer: number
  prayerxp: number
  magicRank: number
  magic: number
  magicxp: number
  cookingRank: number
  cooking: number
  cookingxp: number
  woodcutRank: number
  woodcut: number
  woodcutxp: number
  fishingRank: number
  fishing: number
  fishingxp: number
  firemakingRank: number
  firemaking: number
  firemakingxp: number
  craftingRank: number
  crafting: number
  craftingxp: number
  smithingRank: number
  smithing: number
  smithingxp: number
  miningRank: number
  mining: number
  miningxp: number
}
