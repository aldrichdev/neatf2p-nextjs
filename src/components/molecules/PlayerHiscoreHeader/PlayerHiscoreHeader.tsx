import { BodyText } from '@atoms/BodyText'
import { PageHeading } from '@atoms/PageHeading'
import { PlayerHiscoreHeaderSkeleton } from '@atoms/PlayerHiscoreHeaderSkeleton'
import { PlayerStatCard } from '@atoms/PlayerStatCard'
import { getPrettyDateStringFromMillis } from '@utils/date/date'
import { LastLoginDate, LastLoginLabel, PlayerStatsContainer } from './PlayerHiscoreHeader.styled'
import { PlayerHiscoreHeaderProps } from './PlayerHiscoreHeader.types'

const PlayerHiscoreHeader = (props: PlayerHiscoreHeaderProps) => {
  const { isLoading, accountName, lastLoginMillis, statCards } = props

  return isLoading ? (
    <PlayerHiscoreHeaderSkeleton />
  ) : (
    <>
      <PageHeading marginBottom={0.5}>{accountName}</PageHeading>
      <BodyText variant='body' bodyTextAlign='center' topMargin={0}>
        <LastLoginLabel>Last login:</LastLoginLabel>{' '}
        <LastLoginDate>
          {lastLoginMillis ? getPrettyDateStringFromMillis(lastLoginMillis, true) : 'Never'}
        </LastLoginDate>
      </BodyText>
      <PlayerStatsContainer>
        {statCards.slice(0, 3).map(card => (
          <PlayerStatCard key={card.label} label={card.label} footnote={card.footnote} isRank={card.isRank}>
            {card.children}
          </PlayerStatCard>
        ))}
      </PlayerStatsContainer>
    </>
  )
}

export default PlayerHiscoreHeader
