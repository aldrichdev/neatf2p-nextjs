import { ChangeEvent, FormEvent, useState } from 'react'
import {
  PlayerNameField,
  LookupSubmitButton,
  LookupHeading,
  LookupForm,
  PlayerLookupContainer,
} from './PlayerLookup.styled'
import { redirectTo } from '@helpers/window'

const PlayerLookup = () => {
  const [playerName, setPlayerName] = useState<string>('')

  const handlePlayerNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlayerName(event.target.value)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!playerName) return null

    redirectTo(`/hiscores/player/${playerName?.replace(/_/g, ' ')}`)
  }

  return (
    <PlayerLookupContainer>
      <LookupHeading variant='h3'>Look Up Player</LookupHeading>
      <LookupForm onSubmit={handleSubmit}>
        <PlayerNameField
          required
          type='text'
          label='Player Name'
          onChange={handlePlayerNameChange}
          inputProps={{ maxLength: 12 }}
          value={playerName}
        >
          Player Name
        </PlayerNameField>
        <LookupSubmitButton type='submit' variant='contained'>
          Check
        </LookupSubmitButton>
      </LookupForm>
    </PlayerLookupContainer>
  )
}

export default PlayerLookup
