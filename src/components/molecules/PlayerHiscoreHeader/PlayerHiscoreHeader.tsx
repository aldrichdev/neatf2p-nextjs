import { BodyText } from '@atoms/BodyText'
import { PageHeading } from '@atoms/PageHeading'
import { PlayerHiscoreHeaderSkeleton } from '@atoms/PlayerHiscoreHeaderSkeleton'
import { StatisticCard } from '@atoms/StatisticCard'
import { getPrettyDateStringFromMillis } from '@utils/date/date'
import { PlayerHiscoreHeaderProps } from './PlayerHiscoreHeader.types'

const PlayerHiscoreHeader = (props: PlayerHiscoreHeaderProps) => {
  const { isLoading, accountName, lastLoginMillis, statCards } = props

  return isLoading ? (
    <PlayerHiscoreHeaderSkeleton />
  ) : (
    <>
      <PageHeading className='mb-2'>{accountName}</PageHeading>
      <BodyText bodyTextAlign='center' mobileTextAlign='center' className='mt-0'>
        <span className='text-tertiary-text text-sm'>Last login:</span>{' '}
        <strong className='text-primary-main text-sm'>
          {lastLoginMillis ? getPrettyDateStringFromMillis(lastLoginMillis, true) : 'Never'}
        </strong>
      </BodyText>
      <div className='my-4 grid grid-cols-3 gap-2.5'>
        {statCards.slice(0, 3).map(card => (
          <StatisticCard key={card.label} label={card.label} footnote={card.footnote} isRank={card.isRank}>
            {card.children}
          </StatisticCard>
        ))}
      </div>
    </>
  )
}

export default PlayerHiscoreHeader
