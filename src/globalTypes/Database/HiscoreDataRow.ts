import { HiscoresSortField } from './HiscoresSortField'

export type HiscoreDataRow = HiscoresSortField & {
  username: string
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
