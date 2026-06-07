import { NpcHiscoreType } from '@globalTypes/Hiscores/HiscoreType'
import { getNpcNameById } from '@utils/hiscores/hiscoresUtils'
import { HiscoresControls } from '@atoms/HiscoresControls'
import { NpcHiscoreDataRow } from '@globalTypes/Database/NpcHiscoreDataRow'
import useHiscoresPagination from '@hooks/useHiscoresPagination'
import { HoverUnderlineLink } from '@atoms/HoverUnderlineLink'
import { GoldBadge, SilverBadge, BronzeBadge, RankBadge, TopBadge } from '@molecules/HiscoresTable/Badges'
import clsx from 'clsx'
import { hiscoresStyles } from '../../../consts/styles/hiscores'

type NpcHiscoresTableProps = {
  hiscores: NpcHiscoreDataRow[]
  npcHiscoreType: NpcHiscoreType
  page: number
  setPage: (value: number) => void
}

const NpcHiscoresTable = (props: NpcHiscoresTableProps) => {
  const { hiscores, npcHiscoreType, page, setPage } = props
  const { startingRecord, endingRecord, pageCount, handlePageChange } = useHiscoresPagination(
    true,
    hiscores.length,
    page,
    setPage,
  )
  let rank = startingRecord

  return (
    <div className={hiscoresStyles.hiscoresTableRootContainerClass}>
      <div className={hiscoresStyles.hiscoresTableOuterContainerClass}>
        <table
          aria-label={`${getNpcNameById(npcHiscoreType)} Hiscores Table`}
          className={hiscoresStyles.hiscoresTableClass}
        >
          <thead className={hiscoresStyles.hiscoresTheadClass}>
            <tr className='border-b-0'>
              <th className={hiscoresStyles.hiscoresHeaderCellClass}>Rank</th>
              <th className={hiscoresStyles.hiscoresHeaderCellClass}>Name</th>
              <th className={hiscoresStyles.hiscoresHeaderCellClass}>Kills</th>
            </tr>
          </thead>
          <tbody>
            {hiscores?.slice(startingRecord, endingRecord).map((hiscoreRow, index) => {
              rank++
              const rankToDisplay: number = startingRecord === 0 ? index + 1 : rank

              return (
                <tr key={hiscoreRow.username} className={hiscoresStyles.hiscoresListingTableRowClass}>
                  <td className={hiscoresStyles.hiscoresValueCellClass}>
                    {rankToDisplay === 1 ? (
                      <GoldBadge>1</GoldBadge>
                    ) : rankToDisplay === 2 ? (
                      <SilverBadge>2</SilverBadge>
                    ) : rankToDisplay === 3 ? (
                      <BronzeBadge>3</BronzeBadge>
                    ) : (
                      <RankBadge>{rankToDisplay}</RankBadge>
                    )}
                  </td>
                  <td className={clsx(hiscoresStyles.hiscoresValueCellClass, 'flex items-center gap-3')}>
                    <HoverUnderlineLink href={`/npc-hiscores/player/${hiscoreRow.username}`} className='font-medium'>
                      {hiscoreRow.username}
                    </HoverUnderlineLink>
                    {rankToDisplay === 1 ? <TopBadge>top</TopBadge> : null}
                  </td>
                  <td className={hiscoresStyles.hiscoresValueCellClass}>{hiscoreRow.killCount.toLocaleString()}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      {pageCount > 1 && <HiscoresControls page={page} pageCount={pageCount} handlePageChange={handlePageChange} />}
    </div>
  )
}

export default NpcHiscoresTable
