import { HiscoreSkillEmoji } from '@atoms/HiscoreSkillEmoji'
import { MenuItem, SelectedSkillText, SkillName } from './HiscoresMenuItem.styled'
import { HiscoresMenuItemProps } from './HiscoresMenuItem.types'

const HiscoresMenuItem = (props: HiscoresMenuItemProps) => {
  const { menuItemLabel, hiscoreType, buttonOnClick } = props
  const isSelected = hiscoreType === menuItemLabel
  const skillIconFileName = isSelected ? hiscoreType : menuItemLabel

  return (
    <MenuItem isSelected={isSelected} onClick={() => buttonOnClick(menuItemLabel)}>
      <HiscoreSkillEmoji skill={skillIconFileName} />
      {isSelected ? <SelectedSkillText>{hiscoreType}</SelectedSkillText> : <SkillName>{menuItemLabel}</SkillName>}
    </MenuItem>
  )
}

export default HiscoresMenuItem
