import { PlayerHiscoreDataRow } from '@globalTypes/Database/PlayerHiscoreDataRow'
import { HiscoreType } from '@globalTypes/Hiscores/HiscoreType'
import { TableBody, Paper } from '@mui/material'
import {
  RootContainer,
  HiscoreTableContainer,
  HiscoreTable,
  HiscoreTableValueCell,
  HiscoresTableRow,
  HiscoreTableHeaderCell,
  HiscoresTableHead,
} from './HiscoresTable.styled'
import { convertExp, getTotalExp } from '@utils/hiscores/hiscoresUtils'
import { HiscoresControls } from '@atoms/HiscoresControls'
import useHiscoresPagination from '@hooks/useHiscoresPagination'
import { HoverUnderlineLink } from '@atoms/HoverUnderlineLink'
import {
  BronzeBadge,
  DesktopHiscoreTableCell,
  GoldBadge,
  MobileHiscoreTableCell,
  RankBadge,
  SilverBadge,
  TopBadge,
} from '@styledPages/hiscores.styled'
import { formatExp } from '@utils/string/stringUtils'
import { HiscoresTableRowsSkeleton } from '@atoms/HiscoresTableRowsSkeleton'

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
  let rank = startingRecord

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
        return getTotalExp(hiscore)
      default:
        return hiscore[`${(hiscoreType as string).toLowerCase()}xp` as keyof typeof hiscore] as number
    }
  }

  // TODO: Do we need this? Used to add page to query strings, but that's been removed.
  // useEffect(() => {
  //   push(router, '/hiscores', router.query)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [page])

  return (
    <RootContainer>
      <HiscoreTableContainer component={Paper}>
        <HiscoreTable aria-label={`${hiscoreType} Hiscores Table`}>
          <HiscoresTableHead>
            <HiscoresTableRow>
              <HiscoreTableHeaderCell>Rank</HiscoreTableHeaderCell>
              <HiscoreTableHeaderCell>Name</HiscoreTableHeaderCell>
              <HiscoreTableHeaderCell>Level</HiscoreTableHeaderCell>
              <HiscoreTableHeaderCell>EXP</HiscoreTableHeaderCell>
            </HiscoresTableRow>
          </HiscoresTableHead>
          <TableBody>
            {isLoading || !hiscores ? (
              <HiscoresTableRowsSkeleton />
            ) : (
              hiscores?.slice(startingRecord, endingRecord).map((hiscoreRow, index) => {
                rank++
                const rankToDisplay = startingRecord === 0 ? index + 1 : rank

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
                      <HoverUnderlineLink href={`/hiscores/player/${hiscoreRow.username}`} sx={{ fontWeight: 500 }}>
                        {hiscoreRow.username}
                      </HoverUnderlineLink>
                      {rankToDisplay === 1 ? <TopBadge>top</TopBadge> : null}
                    </HiscoreTableValueCell>
                    <HiscoreTableValueCell>{getHiscoreValue(hiscoreRow)}</HiscoreTableValueCell>
                    <DesktopHiscoreTableCell>{convertExp(getHiscoreSkillXP(hiscoreRow))}</DesktopHiscoreTableCell>
                    <MobileHiscoreTableCell>
                      {formatExp(convertExp(getHiscoreSkillXP(hiscoreRow)))}
                    </MobileHiscoreTableCell>
                  </HiscoresTableRow>
                )
              })
            )}
          </TableBody>
        </HiscoreTable>
      </HiscoreTableContainer>
      {pageCount > 1 && <HiscoresControls page={page} pageCount={pageCount} handlePageChange={handlePageChange} />}
    </RootContainer>
  )
}

export default HiscoresTable
