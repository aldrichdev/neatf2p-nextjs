import { MenuItem, CurrentMenuItemLabel, MenuItemButton } from './HiscoresMenuItem.styled'
import { HiscoresMenuItemProps } from './HiscoresMenuItem.types'

const HiscoresMenuItem = (props: HiscoresMenuItemProps) => {
  const { menuItemLabel, hiscoreType, buttonOnClick } = props
  return (
    <MenuItem>
      {hiscoreType === menuItemLabel ? (
        <CurrentMenuItemLabel>{hiscoreType}</CurrentMenuItemLabel>
      ) : (
        <MenuItemButton variant='text' onClick={() => buttonOnClick(menuItemLabel)}>
          {menuItemLabel}
        </MenuItemButton>
      )}
    </MenuItem>
  )
}

export default HiscoresMenuItem
