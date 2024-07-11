import {
  MenuItem,
  CurrentMenuItemLabel,
  MenuItemButton,
  HiscoreSkill,
} from '@atoms/HiscoresMenuItem/HiscoresMenuItem.styled'
import { NpcHiscoresMenuItemProps } from './NpcHiscoresMenuItem.types'
import { getNpcNameById } from '@helpers/hiscores/hiscoresUtils'

const NpcHiscoresMenuItem = (props: NpcHiscoresMenuItemProps) => {
  const { menuItemNpcId, hiscoreType, buttonOnClick } = props
  const npcName = getNpcNameById(menuItemNpcId)

  return (
    <MenuItem>
      {hiscoreType === menuItemNpcId ? (
        <HiscoreSkill>
          <CurrentMenuItemLabel isNpcMenu>{npcName}</CurrentMenuItemLabel>
        </HiscoreSkill>
      ) : (
        <HiscoreSkill>
          <MenuItemButton variant='text' onClick={() => buttonOnClick(menuItemNpcId)} isNpcMenu>
            {npcName}
          </MenuItemButton>
        </HiscoreSkill>
      )}
    </MenuItem>
  )
}

export default NpcHiscoresMenuItem
