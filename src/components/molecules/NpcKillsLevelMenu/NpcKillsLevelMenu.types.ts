import { NpcHiscoreType } from '@globalTypes/Hiscores/HiscoreType'

export type NpcKillsLevelMenuProps = {
  npcHiscoreType: NpcHiscoreType
  npcSubTypes: NpcHiscoreType[]
  /** When the user clicks a level menu item */
  menuItemOnClick: (npcHiscoreType: NpcHiscoreType) => void
}
