import { PlayerHiscoresRankProps } from './PlayerHiscoresRank.types'
import { NoRank, RankOne, StyledRank } from './PlayerHiscoresRank.styled'

/** Renders a player's rank in the player hiscores. */
const PlayerHiscoresRank = (props: PlayerHiscoresRankProps) => {
  const { rank } = props

  switch (rank) {
    case 0:
      return <NoRank>{'--'}</NoRank>
    case 1:
      return <RankOne title='#1'>👑</RankOne>
    default:
      return <StyledRank rank={rank}>#{rank}</StyledRank>
  }
}

export default PlayerHiscoresRank
