import { PlayerHiscoresRankProps } from './PlayerHiscoresRank.types'

/** Renders a player's rank in the player hiscores. */
const PlayerHiscoresRank = (props: PlayerHiscoresRankProps) => {
  const { rank } = props

  switch (rank) {
    case 0:
      return <span className='text-tertiary-text'>{'--'}</span>
    case 1:
      return (
        <span className='text-base' title='#1'>
          👑
        </span>
      )
    default:
      return <span className='text-secondary-main text-sm font-semibold md:text-base'>#{rank}</span>
  }
}

export default PlayerHiscoresRank
