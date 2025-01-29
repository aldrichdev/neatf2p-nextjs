import { PlayerHiscoresRankProps } from './PlayerHiscoresRank.types'
import { RankOneIcon, RankOneIconContainer } from './PlayerHiscoresRank.styled'

/** Renders a player's rank in the player hiscores. */
const PlayerHiscoresRank = (props: PlayerHiscoresRankProps) => {
  const { rank } = props

  switch (rank) {
    case 0:
      return <RankOneIconContainer>{'--'}</RankOneIconContainer>
    case 1:
      return (
        <RankOneIconContainer>
          <RankOneIcon src={`/img/skills/rankone.png`} alt='' />
        </RankOneIconContainer>
      )
    default:
      return <RankOneIconContainer>{rank}</RankOneIconContainer>
  }
}

export default PlayerHiscoresRank
