import { PlayerHiscoreDataRow } from '@globalTypes/Database/PlayerHiscoreDataRow'
import { HiscoreType } from '@globalTypes/Hiscores/HiscoreType'
import { convertExp } from '@utils/hiscores/hiscoresUtils'
import { HiscoresControls } from '@atoms/HiscoresControls'
import useHiscoresPagination from '@hooks/useHiscoresPagination'
import { GoldBadge, SilverBadge, BronzeBadge, RankBadge, TopBadge } from './Badges'
import { formatExp } from '@utils/string/stringUtils'
import { HiscoresTableRowsSkeleton } from '@atoms/HiscoresTableRowsSkeleton'
import clsx from 'clsx'
import { hiscoresStyles } from '../../../consts/styles/hiscores'
import { StandardLink } from '@atoms/StandardLink'

type HiscoresTableProps = {
  hiscores: PlayerHiscoreDataRow[] | undefined
  isLoading: boolean
  hiscoreType: HiscoreType
  page: number
  setPage: (value: number) => void
}

const HiscoresTable = (props: HiscoresTableProps) => {
  const { hiscores, isLoading, hiscoreType, page, setPage } = props

  const { startingRecord, endingRecord, pageCount, handlePageChange } = useHiscoresPagination(
    false,
    hiscores?.length || 0,
    page,
    setPage,
  )

  const getRank = (hiscore: PlayerHiscoreDataRow) => {
    if (hiscoreType === 'Overall') return hiscore.overallRank
    return hiscore[`${hiscoreType.toLowerCase()}Rank` as keyof PlayerHiscoreDataRow] as number
  }

  const getHiscoreValue = (hiscore: PlayerHiscoreDataRow) => {
    switch (hiscoreType) {
      case 'Overall':
        return hiscore.skill_total
      default:
        return hiscore[(hiscoreType as string).toLowerCase() as keyof typeof hiscore]
    }
  }

  const getHiscoreSkillXP = (hiscore: PlayerHiscoreDataRow) => {
    switch (hiscoreType) {
      case 'Overall':
        return hiscore.totalXp
      default:
        return hiscore[`${(hiscoreType as string).toLowerCase()}xp` as keyof typeof hiscore] as number
    }
  }

  return (
    <div className={hiscoresStyles.hiscoresTableRootContainerClass}>
      <div className={hiscoresStyles.hiscoresTableOuterContainerClass}>
        <table aria-label={`${hiscoreType} Hiscores Table`} className={hiscoresStyles.hiscoresTableClass}>
          <thead className={hiscoresStyles.hiscoresTheadClass}>
            <tr className='border-b-0'>
              <th className={hiscoresStyles.hiscoresHeaderCellClass}>Rank</th>
              <th className={hiscoresStyles.hiscoresHeaderCellClass}>Name</th>
              <th className={hiscoresStyles.hiscoresHeaderCellClass}>Level</th>
              <th className={hiscoresStyles.hiscoresHeaderCellClass}>EXP</th>
            </tr>
          </thead>
          <tbody>
            {isLoading || !hiscores ? (
              <HiscoresTableRowsSkeleton />
            ) : (
              hiscores?.slice(startingRecord, endingRecord).map(hiscoreRow => {
                const rank = getRank(hiscoreRow)

                return (
                  <tr key={hiscoreRow.username} className={hiscoresStyles.hiscoresListingTableRowClass}>
                    <td className={hiscoresStyles.hiscoresValueCellClass}>
                      {rank === 1 ? (
                        <GoldBadge>1</GoldBadge>
                      ) : rank === 2 ? (
                        <SilverBadge>2</SilverBadge>
                      ) : rank === 3 ? (
                        <BronzeBadge>3</BronzeBadge>
                      ) : (
                        <RankBadge>{rank}</RankBadge>
                      )}
                    </td>
                    <td className={clsx(hiscoresStyles.hiscoresValueCellClass, 'flex items-center gap-3')}>
                      <StandardLink
                        href={`/hiscores/player/${hiscoreRow.username}`}
                        hoverUnderline
                        className='font-medium'
                      >
                        {hiscoreRow.username}
                      </StandardLink>
                      {rank === 1 ? <TopBadge>top</TopBadge> : null}
                    </td>
                    <td className={hiscoresStyles.hiscoresValueCellClass}>{getHiscoreValue(hiscoreRow)}</td>
                    <td className={hiscoresStyles.hiscoresDesktopCellClass}>
                      {convertExp(getHiscoreSkillXP(hiscoreRow))}
                    </td>
                    <td className={hiscoresStyles.hiscoresMobileCellClass}>
                      {formatExp(convertExp(getHiscoreSkillXP(hiscoreRow)))}
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
      {pageCount > 1 && <HiscoresControls page={page} pageCount={pageCount} handlePageChange={handlePageChange} />}
    </div>
  )
}

export default HiscoresTable
