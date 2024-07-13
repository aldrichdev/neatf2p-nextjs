import { MenuItem, CurrentMenuItemLabel, MenuItemButton } from '@atoms/HiscoresMenuItem/HiscoresMenuItem.styled'
import { NpcHiscoresMenuItemProps } from './NpcHiscoresMenuItem.types'
import { getNpcNameById } from '@helpers/hiscores/hiscoresUtils'

const NpcHiscoresMenuItem = (props: NpcHiscoresMenuItemProps) => {
  const { menuItemNpcId, hiscoreType, buttonOnClick } = props
  const npcName = getNpcNameById(menuItemNpcId)

  return (
    <MenuItem>
      {JSON.stringify(hiscoreType) === JSON.stringify(menuItemNpcId) ? (
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
