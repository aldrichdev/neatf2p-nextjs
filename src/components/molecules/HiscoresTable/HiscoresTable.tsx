import { PlayerHiscoreDataRow } from '@globalTypes/Database/PlayerHiscoreDataRow'
import { HiscoreType } from '@globalTypes/Hiscores/HiscoreType'
import { convertExp } from '@utils/hiscores/hiscoresUtils'
import { HiscoresControls } from '@atoms/HiscoresControls'
import useHiscoresPagination from '@hooks/useHiscoresPagination'
import { HoverUnderlineLink } from '@atoms/HoverUnderlineLink'
import { GoldBadge, SilverBadge, BronzeBadge, RankBadge, TopBadge } from './Badges'
import { formatExp } from '@utils/string/stringUtils'
import { HiscoresTableRowsSkeleton } from '@atoms/HiscoresTableRowsSkeleton'
import clsx from 'clsx'
import {
  hiscoresDesktopCellClass,
  hiscoresHeaderCellClass,
  hiscoresListingTableRowClass,
  hiscoresMobileCellClass,
  hiscoresTableClass,
  hiscoresTableOuterContainerClass,
  hiscoresTableRootContainerClass,
  hiscoresTheadClass,
  hiscoresValueCellClass,
} from '../../../consts/styles/hiscores'

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
    <div className={hiscoresTableRootContainerClass}>
      <div className={hiscoresTableOuterContainerClass}>
        <table aria-label={`${hiscoreType} Hiscores Table`} className={hiscoresTableClass}>
          <thead className={hiscoresTheadClass}>
            <tr className='border-b-0'>
              <th className={hiscoresHeaderCellClass}>Rank</th>
              <th className={hiscoresHeaderCellClass}>Name</th>
              <th className={hiscoresHeaderCellClass}>Level</th>
              <th className={hiscoresHeaderCellClass}>EXP</th>
            </tr>
          </thead>
          <tbody>
            {isLoading || !hiscores ? (
              <HiscoresTableRowsSkeleton />
            ) : (
              hiscores?.slice(startingRecord, endingRecord).map(hiscoreRow => {
                const rank = getRank(hiscoreRow)

                return (
                  <tr key={hiscoreRow.username} className={hiscoresListingTableRowClass}>
                    <td className={hiscoresValueCellClass}>
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
                    <td className={clsx(hiscoresValueCellClass, 'flex items-center gap-3')}>
                      <HoverUnderlineLink href={`/hiscores/player/${hiscoreRow.username}`} className='font-medium'>
                        {hiscoreRow.username}
                      </HoverUnderlineLink>
                      {rank === 1 ? <TopBadge>top</TopBadge> : null}
                    </td>
                    <td className={hiscoresValueCellClass}>{getHiscoreValue(hiscoreRow)}</td>
                    <td className={hiscoresDesktopCellClass}>{convertExp(getHiscoreSkillXP(hiscoreRow))}</td>
                    <td className={hiscoresMobileCellClass}>{formatExp(convertExp(getHiscoreSkillXP(hiscoreRow)))}</td>
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
