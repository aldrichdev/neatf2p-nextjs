import { MenuItem, CurrentMenuItemLabel, MenuItemButton } from '@atoms/HiscoresMenuItem/HiscoresMenuItem.styled'
import { NpcHiscoresMenuItemProps } from './NpcHiscoresMenuItem.types'
import { getNpcIdsByInitialId, getNpcNameByIdForMenu } from '@helpers/hiscores/hiscoresUtils'

const NpcHiscoresMenuItem = (props: NpcHiscoresMenuItemProps) => {
  const { menuItemNpcId, hiscoreType, buttonOnClick } = props
  const npcName = getNpcNameByIdForMenu(menuItemNpcId)

  // if npcHiscoreType = 41 and menuItemNpcId = 52, prove that 41 is related to 52 and return true
  // if you pass the menu item id into the function we made and it returns an array where 41 is present...
  // TODO: Update for aggregate NPC levels (i.e. Goblin - [4, 153, 154])
  // if (typeof menuItemNpcId === 'number') {
  //   console.log(
  //     'menuItemNpcId',
  //     menuItemNpcId,
  //     'hiscoreType',
  //     hiscoreType,
  //     'getNpcIdsByInitialId(menuItemNpcId)',
  //     getNpcIdsByInitialId(menuItemNpcId),
  //     getNpcIdsByInitialId(menuItemNpcId).includes(hiscoreType),
  //     JSON.stringify(getNpcIdsByInitialId(menuItemNpcId)),
  //     JSON.stringify(hiscoreType),
  //     JSON.stringify(getNpcIdsByInitialId(menuItemNpcId)).includes(JSON.stringify(hiscoreType)),
  //   )
  // }

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

  return (
    <MenuItem>
      {JSON.stringify(hiscoreType) === JSON.stringify(menuItemNpcId) || isHiscoreTypeRelatedToMenuItem() ? (
        <CurrentMenuItemLabel isNpcMenu>{npcName}</CurrentMenuItemLabel>
      ) : (
        <MenuItemButton variant='text' onClick={() => buttonOnClick(menuItemNpcId)} isNpcMenu>
          {npcName}
        </MenuItemButton>
      )}
    </MenuItem>
  )
}

export default NpcHiscoresMenuItem
