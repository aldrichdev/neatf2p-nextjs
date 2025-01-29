import { NpcHiscoreType } from '@globalTypes/Hiscores/HiscoreType'

// Example: [62, [4, 153, 154]] is an array of sub types we need to support.
export type NpcKillsLevelMenuSubType = number | number[]

export type NpcKillsLevelMenuProps = {
  npcHiscoreType: NpcHiscoreType
  npcSubTypes: NpcKillsLevelMenuSubType[]
  /** When the user clicks a level menu item */
  menuItemOnClick: (npcHiscoreType: NpcHiscoreType) => void
}
