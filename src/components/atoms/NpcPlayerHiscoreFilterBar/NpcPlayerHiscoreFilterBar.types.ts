import { Dispatch, SetStateAction } from 'react'
import { npcPlayerHiscoreFilters } from './NpcPlayerHiscoreFilterBar.consts'

export type NpcPlayerHiscoreFilter = (typeof npcPlayerHiscoreFilters)[number]

export type NpcPlayerHiscoreFilterBarProps = {
  isLoading: boolean
  search: string
  setSearch: Dispatch<SetStateAction<string>>
  activeFilter: NpcPlayerHiscoreFilter
  setActiveFilter: Dispatch<SetStateAction<NpcPlayerHiscoreFilter>>
}
