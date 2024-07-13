import { NpcHiscoreType } from '@globalTypes/Hiscores/HiscoreType'

export type NpcHiscoresMenuProps = {
  /** This is the current, or active hiscore type, which is either the default (first
   * option in the menu), or the type specified in the query string.
   */
  activeNpcHiscoreType: NpcHiscoreType
  buttonOnClick: (npcHiscoreType: NpcHiscoreType) => void
}
