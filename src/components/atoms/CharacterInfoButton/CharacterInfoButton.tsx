import { Info } from 'lucide-react'
import { InfoButton } from './CharacterInfoButton.styled'
import { CharacterInfoButtonProps } from './CharacterInfoButton.types'

const CharacterInfoButton = (props: CharacterInfoButtonProps) => {
  const { handleClick } = props

  return (
    <InfoButton onClick={handleClick}>
      <Info />
    </InfoButton>
  )
}

export default CharacterInfoButton
