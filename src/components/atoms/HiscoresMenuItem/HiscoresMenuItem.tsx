import { MenuItem, CurrentMenuItemLabel, MenuItemButton, HiscoreMenuSkillIcon } from './HiscoresMenuItem.styled'
import { HiscoresMenuItemProps } from './HiscoresMenuItem.types'

const HiscoresMenuItem = (props: HiscoresMenuItemProps) => {
  const { menuItemLabel, hiscoreType, buttonOnClick } = props

  return (
    <MenuItem>
      {hiscoreType === menuItemLabel ? (
        <>
          <HiscoreMenuSkillIcon src={`/img/skills/${hiscoreType}.png`} alt='' />
          <CurrentMenuItemLabel>{hiscoreType}</CurrentMenuItemLabel>
        </>
      ) : (
        <>
          <HiscoreMenuSkillIcon src={`/img/skills/${menuItemLabel}.png`} alt='' />
          <MenuItemButton variant='text' onClick={() => buttonOnClick(menuItemLabel)}>
            {menuItemLabel}
          </MenuItemButton>
        </>
      )}
    </MenuItem>
  )
}

export default HiscoresMenuItem
