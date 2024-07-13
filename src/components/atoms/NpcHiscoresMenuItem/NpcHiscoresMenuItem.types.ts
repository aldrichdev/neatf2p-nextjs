import { NpcHiscoreType } from '@globalTypes/Hiscores/HiscoreType'

export type NpcHiscoresMenuItemProps = {
  menuItemNpcId: NpcHiscoreType
  hiscoreType: NpcHiscoreType
  buttonOnClick: (npcHiscoreType: NpcHiscoreType) => void
}
