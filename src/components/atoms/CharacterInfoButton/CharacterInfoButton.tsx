import { InfoButton } from './CharacterInfoButton.styled'
import { CharacterInfoButtonProps } from './CharacterInfoButton.types'
import InfoIcon from '@mui/icons-material/Info'

const CharacterInfoButton = (props: CharacterInfoButtonProps) => {
  const { handleClick } = props

  return (
    <InfoButton onClick={handleClick}>
      <InfoIcon />
    </InfoButton>
  )
}

export default CharacterInfoButton
