import { PlayerHiscoresSortField } from './PlayerHiscoresSortField'

export type PlayerHiscoreDataRow = PlayerHiscoresSortField & {
  username: string
  login_date: number
  attack: number
  defense: number
  strength: number
  hits: number
  ranged: number
  prayer: number
  magic: number
  cooking: number
  woodcut: number
  fishing: number
  firemaking: number
  crafting: number
  smithing: number
  mining: number
}
