import { SkillEmoji } from './HiscoreSkillEmoji.styled'
import { HiscoreSkillEmojiProps } from './HiscoreSkillEmoji.types'

const HiscoreSkillEmoji = (props: HiscoreSkillEmojiProps) => {
  const { skill } = props

  const getEmojiBySkill = () => {
    switch (skill) {
      case 'Overall':
        return '📈'
      case 'Hits':
        return '❤️'
      case 'Ranged':
        return '🏹'
      case 'Prayer':
        return '✨'
      case 'Magic':
        return '🔮'
      case 'Cooking':
        return '🍳'
      case 'Woodcut':
        return '🌲'
      case 'Fishing':
        return '🎣'
      case 'Firemaking':
        return '🔥'
      case 'Crafting':
        return '⚒️'
      case 'Smithing':
        return '🔨'
      case 'Mining':
        return '⛏️'
      default:
        return '🎭'
    }
  }

  return <SkillEmoji>{getEmojiBySkill()}</SkillEmoji>
}

export default HiscoreSkillEmoji
