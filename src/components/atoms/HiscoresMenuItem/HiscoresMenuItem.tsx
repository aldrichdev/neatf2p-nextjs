import {
  MenuItem,
  CurrentMenuItemLabel,
  MenuItemButton,
  HiscoreSkill,
  HiscoreMenuSkillIcon,
} from './HiscoresMenuItem.styled'
import { HiscoresMenuItemProps } from './HiscoresMenuItem.types'

const HiscoresMenuItem = (props: HiscoresMenuItemProps) => {
  const { menuItemLabel, hiscoreType, buttonOnClick } = props

  return (
    <MenuItem>
      {hiscoreType === menuItemLabel ? (
        <HiscoreSkill>
          <HiscoreMenuSkillIcon src={`/img/skills/${hiscoreType}.png`} alt='' />
          <CurrentMenuItemLabel>{hiscoreType}</CurrentMenuItemLabel>
        </HiscoreSkill>
      ) : (
        <HiscoreSkill>
          <HiscoreMenuSkillIcon src={`/img/skills/${menuItemLabel}.png`} alt='' />
          <MenuItemButton variant='text' onClick={() => buttonOnClick(menuItemLabel)}>
            {menuItemLabel}
          </MenuItemButton>
        </HiscoreSkill>
      )}
    </MenuItem>
  )
}

export default HiscoresMenuItem
