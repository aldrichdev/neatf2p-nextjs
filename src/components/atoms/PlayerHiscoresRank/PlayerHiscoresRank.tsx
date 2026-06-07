import { PlayerHiscoresRankProps } from './PlayerHiscoresRank.types'

/** Renders a player's rank in the player hiscores. */
const PlayerHiscoresRank = (props: PlayerHiscoresRankProps) => {
  const { rank } = props

  switch (rank) {
    case 0:
      return <span className='text-tertiary-text'>{'--'}</span>
    case 1:
      return (
        <span className='text-[16px]' title='#1'>
          👑
        </span>
      )
    default:
      return <span className='text-secondary-main text-[14px] font-semibold md:text-[16px]'>#{rank}</span>
  }
}

export default PlayerHiscoresRank
