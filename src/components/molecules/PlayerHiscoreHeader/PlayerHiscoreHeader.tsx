import { BodyText } from '@atoms/BodyText'
import { PageHeading } from '@atoms/PageHeading'
import { PlayerHiscoreHeaderSkeleton } from '@atoms/PlayerHiscoreHeaderSkeleton'
import { PlayerStatCard } from '@atoms/PlayerStatCard'
import { getPrettyDateStringFromMillis } from '@utils/date/date'
import { formatExp } from '@utils/string/stringUtils'
import { LastLoginDate, LastLoginLabel, PlayerStatsContainer } from './PlayerHiscoreHeader.styled'
import { PlayerHiscoreHeaderProps } from './PlayerHiscoreHeader.types'

const PlayerHiscoreHeader = (props: PlayerHiscoreHeaderProps) => {
  const { isLoading, accountName, lastLoginMillis, overallHiscoreRecord } = props
  const overallRank = overallHiscoreRecord?.rank
  const skillTotal = overallHiscoreRecord?.level
  const totalExp = overallHiscoreRecord?.exp
  const totalExpShorthand = totalExp ? formatExp(totalExp) : ''

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
        <PlayerStatCard label='Overall rank' footnote='of all players' isRank>
          {`#${overallRank}`}
        </PlayerStatCard>
        <PlayerStatCard label='Skill total' footnote='across 14 skills'>
          {skillTotal}
        </PlayerStatCard>
        <PlayerStatCard label='Total exp' footnote={totalExp ? `${totalExp} xp` : ''}>
          {totalExpShorthand}
        </PlayerStatCard>
      </PlayerStatsContainer>
    </>
  )
}

export default PlayerHiscoreHeader
