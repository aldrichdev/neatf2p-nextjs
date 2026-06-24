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

  return <span className='flex items-center text-base leading-none'>{getEmojiBySkill()}</span>
}

export default HiscoreSkillEmoji
