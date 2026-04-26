import { StatCard, StatCardFootnote, StatCardLabel, StatCardValue } from './StatisticCard.styled'
import { StatisticCardProps } from './StatisticCard.types'

/** A small card displaying a statistic with supplementary text. */
const StatisticCard = (props: StatisticCardProps) => {
  const { label, children, footnote, isRank } = props

  return (
    <StatCard>
      <StatCardLabel>{label}</StatCardLabel>
      <StatCardValue isRank={isRank}>{children}</StatCardValue>
      <StatCardFootnote>{footnote}</StatCardFootnote>
    </StatCard>
  )
}

export default StatisticCard
