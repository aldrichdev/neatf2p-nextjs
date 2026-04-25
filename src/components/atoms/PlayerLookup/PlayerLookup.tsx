import { ChangeEvent, FormEvent, useState } from 'react'
import {
  PlayerNameField,
  LookupHeading,
  LookupForm,
  PlayerLookupContainer,
  LookupSubmitButton,
} from './PlayerLookup.styled'
import { redirectTo } from '@utils/window'
import { FormButton } from '@atoms/FormButton/FormButton'

type PlayerLookupProps = {
  isNpcHiscores?: boolean
}

const PlayerLookup = (props: PlayerLookupProps) => {
  const { isNpcHiscores } = props
  const [playerName, setPlayerName] = useState<string>('')

  const handlePlayerNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlayerName(event.target.value)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!playerName) return null

    redirectTo(`/${isNpcHiscores ? 'npc-hiscores' : 'hiscores'}/player/${playerName?.replace(/_/g, ' ')}`)
  }

  return (
    <PlayerLookupContainer>
      <LookupHeading variant='h3'>Look Up Player</LookupHeading>
      <LookupForm onSubmit={handleSubmit}>
        <PlayerNameField
          required
          type='text'
          placeholder='Player name...'
          onChange={handlePlayerNameChange}
          inputProps={{ maxLength: 12 }}
          value={playerName}
        >
          Player Name
        </PlayerNameField>
        <LookupSubmitButton type='submit' variant='contained'>
          Search
        </LookupSubmitButton>
      </LookupForm>
    </PlayerLookupContainer>
  )
}

export default PlayerLookup
