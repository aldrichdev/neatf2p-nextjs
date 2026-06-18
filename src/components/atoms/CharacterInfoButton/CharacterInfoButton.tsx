import { Info } from 'lucide-react'
import { CharacterInfoButtonProps } from './CharacterInfoButton.types'
import clsx from 'clsx'

const CharacterInfoButton = (props: CharacterInfoButtonProps) => {
  const { handleClick } = props

  return (
    <button
      onClick={handleClick}
      className={clsx(
        'cursor-pointer rounded-full border-none bg-transparent p-0 transition-colors',
        'hover:bg-secondary-light [&>svg]:fill-secondary-main focus-visible:bg-blue-500/20 md:p-2 [&>svg]:stroke-white',
      )}
    >
      <Info className='text-secondary-main' />
    </button>
  )
}

export default CharacterInfoButton
