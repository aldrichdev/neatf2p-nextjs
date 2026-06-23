import { StatisticCardProps } from './StatisticCard.types'
import clsx from 'clsx'

/** A small card displaying a statistic with supplementary text. */
const StatisticCard = (props: StatisticCardProps) => {
  const { label, children, footnote, isRank } = props

  return (
    <div className='text-tertiary-text bg-sidebar-bg flex flex-wrap rounded-lg px-3.5 py-2.5 text-left leading-tight'>
      <div className='mb-1 basis-full text-[11px] tracking-wider uppercase'>{label}</div>
      <div className={clsx('basis-full text-xl font-semibold', isRank ? 'text-secondary-main' : 'text-text-primary')}>
        {children}
      </div>
      <div className='mt-0.5 basis-full text-[11px]'>{footnote}</div>
    </div>
  )
}

export default StatisticCard
