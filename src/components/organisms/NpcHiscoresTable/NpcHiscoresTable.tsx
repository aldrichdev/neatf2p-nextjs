import { NpcHiscoreType } from '@globalTypes/Hiscores/HiscoreType'
import { TableBody, Paper } from '@mui/material'
import {
  RootContainer,
  HiscoreTable,
  HiscoresTableRow,
  HiscoreTableValueCell,
  HiscoreTableHeaderCell,
  HiscoresTableHead,
} from '@molecules/HiscoresTable/HiscoresTable.styled'
import { getNpcNameById } from '@utils/hiscores/hiscoresUtils'
import { HiscoresControls } from '@atoms/HiscoresControls'
import { NpcHiscoreDataRow } from '@globalTypes/Database/NpcHiscoreDataRow'
import useHiscoresPagination from '@hooks/useHiscoresPagination'
import { HoverUnderlineLink } from '@atoms/HoverUnderlineLink'
import { GoldBadge, SilverBadge, BronzeBadge, RankBadge, TopBadge } from '@styledPages/hiscores.styled'
import { NpcHiscoreTableContainer } from './NpcHiscoresTable.styled'

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

  // TODO: Still necessary? (Used to add `page` qs which we don't want anymore)
  // useEffect(() => {
  //   push(router, '/npc-hiscores', router.query)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [page])

  return (
    <RootContainer>
      <NpcHiscoreTableContainer component={Paper}>
        <HiscoreTable aria-label={`${getNpcNameById(npcHiscoreType)} Hiscores Table`}>
          <HiscoresTableHead>
            <HiscoresTableRow>
              <HiscoreTableHeaderCell>Rank</HiscoreTableHeaderCell>
              <HiscoreTableHeaderCell>Name</HiscoreTableHeaderCell>
              <HiscoreTableHeaderCell>Kills</HiscoreTableHeaderCell>
            </HiscoresTableRow>
          </HiscoresTableHead>
          <TableBody>
            {hiscores?.slice(startingRecord, endingRecord).map((hiscoreRow, index) => {
              rank++
              const rankToDisplay: number = startingRecord === 0 ? index + 1 : rank

              return (
                <HiscoresTableRow key={hiscoreRow.username}>
                  <HiscoreTableValueCell>
                    {rankToDisplay === 1 ? (
                      <GoldBadge>1</GoldBadge>
                    ) : rankToDisplay === 2 ? (
                      <SilverBadge>2</SilverBadge>
                    ) : rankToDisplay === 3 ? (
                      <BronzeBadge>3</BronzeBadge>
                    ) : (
                      <RankBadge>{rankToDisplay}</RankBadge>
                    )}
                  </HiscoreTableValueCell>
                  <HiscoreTableValueCell sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <HoverUnderlineLink href={`/npc-hiscores/player/${hiscoreRow.username}`} sx={{ fontWeight: 500 }}>
                      {hiscoreRow.username}
                    </HoverUnderlineLink>
                    {rankToDisplay === 1 ? <TopBadge>top</TopBadge> : null}
                  </HiscoreTableValueCell>
                  <HiscoreTableValueCell>{hiscoreRow.killCount.toLocaleString()}</HiscoreTableValueCell>
                </HiscoresTableRow>
              )
            })}
          </TableBody>
        </HiscoreTable>
      </NpcHiscoreTableContainer>
      {pageCount > 1 && <HiscoresControls page={page} pageCount={pageCount} handlePageChange={handlePageChange} />}
    </RootContainer>
  )
}

export default NpcHiscoresTable
