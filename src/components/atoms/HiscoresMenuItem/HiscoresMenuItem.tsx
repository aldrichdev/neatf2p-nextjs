import { HiscoreSkillEmoji } from '@atoms/HiscoreSkillEmoji'
import { MenuItem, HiscoreMenuSkillIcon, SelectedSkillText, SkillName } from './HiscoresMenuItem.styled'
import { HiscoresMenuItemProps } from './HiscoresMenuItem.types'

const HiscoresMenuItem = (props: HiscoresMenuItemProps) => {
  const { menuItemLabel, hiscoreType, buttonOnClick } = props
  const isSelected = hiscoreType === menuItemLabel
  const skillIconFileName = isSelected ? hiscoreType : menuItemLabel

  console.log('hiscoreType', hiscoreType)

  return (
    <MenuItem isSelected={isSelected} onClick={() => buttonOnClick(menuItemLabel)}>
      <HiscoreSkillEmoji skill={skillIconFileName} />
      {/* <HiscoreMenuSkillIcon src={`/img/skills/${skillIconFileName}.png`} alt='' /> */}
      {isSelected ? <SelectedSkillText>{hiscoreType}</SelectedSkillText> : <SkillName>{menuItemLabel}</SkillName>}
    </MenuItem>
  )
}

export default HiscoresMenuItem
