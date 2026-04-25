import { StatCard, StatCardFootnote, StatCardLabel, StatCardValue } from './PlayerStatCard.styled'
import { PlayerStatCardProps } from './PlayerStatCard.types'

/** A small card displaying a statistic of a player account.
 * Maybe genericize this into `StatisticCard` later if similar needs arise.
 */
const PlayerStatCard = (props: PlayerStatCardProps) => {
  const { label, children, footnote, isRank } = props
  console.log('label', label, 'isRank', isRank)
  return (
    <StatCard>
      <StatCardLabel>{label}</StatCardLabel>
      <StatCardValue isRank={isRank}>{children}</StatCardValue>
      <StatCardFootnote>{footnote}</StatCardFootnote>
    </StatCard>
  )
}

export default PlayerStatCard
