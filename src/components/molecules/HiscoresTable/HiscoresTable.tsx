import { PlayerHiscoreDataRow } from '@globalTypes/Database/PlayerHiscoreDataRow'
import { HiscoreType } from '@globalTypes/Hiscores/HiscoreType'
import { TableBody, Paper } from '@mui/material'
import {
  RootContainer,
  HiscoreTableContainer,
  HiscoreTable,
  HiscoreTableCell,
  HiscoresTableRow,
  HiscoreTableHeaderCell,
  HiscoresTableHead,
  TopBadge,
  GoldBadge,
  SilverBadge,
  BronzeBadge,
  NormalRankBadge,
  RankBadge,
} from './HiscoresTable.styled'
import { convertExp, getTotalExp } from '@utils/hiscores/hiscoresUtils'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { push } from '@utils/router'
import { HiscoresControls } from '@atoms/HiscoresControls'
import useHiscoresPagination from '@hooks/useHiscoresPagination'
import { HoverUnderlineLink } from '@atoms/HoverUnderlineLink'

type HiscoresTableProps = {
  hiscores: PlayerHiscoreDataRow[]
  hiscoreType: HiscoreType
  page: number
  setPage: (value: number) => void
}

const HiscoresTable = (props: HiscoresTableProps) => {
  const { hiscores, hiscoreType, page, setPage } = props
  const router = useRouter()
  const { startingRecord, endingRecord, pageCount, handlePageChange, handleScrollToTop } = useHiscoresPagination(
    false,
    hiscores.length,
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

  useEffect(() => {
    router.query.page = page.toString()
    push(router, '/hiscores', router.query)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  return (
    <RootContainer>
      <HiscoreTableContainer component={Paper}>
        <HiscoreTable aria-label={`${hiscoreType} Hiscores Table`}>
          <HiscoresTableHead>
            <HiscoresTableRow>
              <HiscoreTableHeaderCell sx={{ borderRadius: '8px 0 0 0' }}>Rank</HiscoreTableHeaderCell>
              <HiscoreTableHeaderCell>Name</HiscoreTableHeaderCell>
              <HiscoreTableHeaderCell>Level</HiscoreTableHeaderCell>
              <HiscoreTableHeaderCell sx={{ borderRadius: '0 8px 0 0' }}>EXP</HiscoreTableHeaderCell>
            </HiscoresTableRow>
          </HiscoresTableHead>
          <TableBody>
            {hiscores?.slice(startingRecord, endingRecord).map((hiscoreRow, index) => {
              rank++
              const rankToDisplay = startingRecord === 0 ? index + 1 : rank

              return (
                <HiscoresTableRow key={hiscoreRow.username}>
                  <HiscoreTableCell component='th' scope='row'>
                    {rankToDisplay === 1 ? (
                      <GoldBadge>1</GoldBadge>
                    ) : rankToDisplay === 2 ? (
                      <SilverBadge>2</SilverBadge>
                    ) : rankToDisplay === 3 ? (
                      <BronzeBadge>3</BronzeBadge>
                    ) : (
                      <RankBadge>{rankToDisplay}</RankBadge>
                    )}
                  </HiscoreTableCell>
                  <HiscoreTableCell sx={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <HoverUnderlineLink href={`/hiscores/player/${hiscoreRow.username}`}>
                      {hiscoreRow.username}
                    </HoverUnderlineLink>
                    {rankToDisplay === 1 ? (
                      <span>
                        <TopBadge>top</TopBadge>
                      </span>
                    ) : null}
                  </HiscoreTableCell>
                  <HiscoreTableCell>{getHiscoreValue(hiscoreRow)}</HiscoreTableCell>
                  <HiscoreTableCell>{convertExp(getHiscoreSkillXP(hiscoreRow))}</HiscoreTableCell>
                </HiscoresTableRow>
              )
            })}
          </TableBody>
        </HiscoreTable>
      </HiscoreTableContainer>
      {pageCount > 1 && (
        <HiscoresControls
          page={page}
          pageCount={pageCount}
          handlePageChange={handlePageChange}
          handleScrollToTop={handleScrollToTop}
        />
      )}
    </RootContainer>
  )
}

export default HiscoresTable
