import { HiscoreSkillEmoji } from '@atoms/HiscoreSkillEmoji'
import { HiscoresMenuItemProps } from './HiscoresMenuItem.types'
import clsx from 'clsx'
import { hiscoresStyles } from '../../../consts/styles/hiscores'

const HiscoresMenuItem = (props: HiscoresMenuItemProps) => {
  const { menuItemLabel, hiscoreType, buttonOnClick } = props
  const isSelected = hiscoreType === menuItemLabel
  const skillIconFileName = isSelected ? hiscoreType : menuItemLabel
  const skillNameClass = 'text-xs leading-none md:text-sm'

  return (
    <li onClick={() => buttonOnClick(menuItemLabel)} className={hiscoresStyles.hiscoresMenuItem(isSelected)}>
      <HiscoreSkillEmoji skill={skillIconFileName} />
      {isSelected ? (
        <span className={clsx(skillNameClass, 'font-medium')}>{hiscoreType}</span>
      ) : (
        <span className={clsx(skillNameClass, 'font-normal')}>{menuItemLabel}</span>
      )}
    </li>
  )
}

export default HiscoresMenuItem
