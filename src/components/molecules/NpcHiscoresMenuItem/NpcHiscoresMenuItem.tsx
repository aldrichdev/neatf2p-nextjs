import { hiscoresStyles } from '../../../consts/styles/hiscores'
import { NpcHiscoresMenuItemProps } from './NpcHiscoresMenuItem.types'
import { getNpcIdsByInitialId, getNpcNameByIdForMenu } from '@utils/hiscores/hiscoresUtils'

const NpcHiscoresMenuItem = (props: NpcHiscoresMenuItemProps) => {
  const { menuItemNpcId, hiscoreType, buttonOnClick } = props
  const npcName = getNpcNameByIdForMenu(menuItemNpcId)

  /** Since we only put the first ID of a series of NPC IDs that are the same NPC but different levels
   * into the sidebar (menu), we need this component to associate those other NPC IDs that aren't in
   * the menu with the ones that are, so we can highlight the NPC name in the menu when the user is
   * on one of those other NPC ID pages.
   */
  const isHiscoreTypeRelatedToMenuItem = () => {
    if (typeof menuItemNpcId !== 'number') {
      return false
    }

    if (Array.isArray(hiscoreType)) {
      return JSON.stringify(getNpcIdsByInitialId(menuItemNpcId)).includes(JSON.stringify(hiscoreType))
    } else {
      return getNpcIdsByInitialId(menuItemNpcId).includes(hiscoreType)
    }
  }

  const isSelected = JSON.stringify(hiscoreType) === JSON.stringify(menuItemNpcId) || isHiscoreTypeRelatedToMenuItem()

  return (
    <li onClick={() => buttonOnClick(menuItemNpcId)} className={hiscoresStyles.hiscoresMenuItem(isSelected)}>
      {npcName}
    </li>
  )
}

export default NpcHiscoresMenuItem
