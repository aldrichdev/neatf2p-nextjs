import { ChangeEvent, FormEvent, useState } from 'react'
import { redirectTo } from '@utils/window'
import { Input } from '@ui/input'
import { Button } from '@ui/button'
import clsx from 'clsx'

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
    <div
      className={clsx('bg-sidebar-bg border-divider rounded-lg border-[0.5px] p-3.5', 'md:basis-full lg:basis-auto')}
    >
      <h3 className='text-left font-[Cinzel,serif] text-[16px] font-semibold'>Look Up Player</h3>
      <form onSubmit={handleSubmit} className='flex flex-wrap justify-center'>
        <Input
          required
          type='text'
          placeholder='Player name...'
          onChange={handlePlayerNameChange}
          maxLength={12}
          value={playerName}
          className='bg-background-paper mt-2.5 w-full'
        />
        <Button type='submit' className='mt-2.5 w-full text-[18px]'>
          Search
        </Button>
      </form>
    </div>
  )
}

export default PlayerLookup
