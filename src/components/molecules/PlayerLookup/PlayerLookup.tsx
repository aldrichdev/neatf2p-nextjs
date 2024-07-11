import { ChangeEvent, FormEvent, useState } from 'react'
import {
  PlayerNameField,
  LookupSubmitButton,
  LookupHeading,
  LookupForm,
  PlayerLookupContainer,
} from './PlayerLookup.styled'
import { redirectTo } from '@helpers/window'

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
    <PlayerLookupContainer isNpcHiscores={isNpcHiscores}>
      <LookupHeading variant='h3' isNpcHiscores={isNpcHiscores}>
        Look Up Player
      </LookupHeading>
      <LookupForm onSubmit={handleSubmit}>
        <PlayerNameField
          required
          type='text'
          label='Player Name'
          onChange={handlePlayerNameChange}
          inputProps={{ maxLength: 12 }}
          value={playerName}
          labelColor={isNpcHiscores ? 'var(--npc-hiscores-text-color)' : undefined}
          borderColor={isNpcHiscores ? 'var(--npc-hiscores-text-color)' : undefined}
        >
          Player Name
        </PlayerNameField>
        <LookupSubmitButton type='submit' variant='contained' isNpcHiscores={isNpcHiscores}>
          Check
        </LookupSubmitButton>
      </LookupForm>
    </PlayerLookupContainer>
  )
}

export default PlayerLookup
