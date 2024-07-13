import { PlayerHiscoreDataRow } from '@globalTypes/Database/PlayerHiscoreDataRow'
import { HiscoreType } from '@globalTypes/Hiscores/HiscoreType'
import { TableBody, TableHead, Paper } from '@mui/material'
import {
  RootContainer,
  HiscoreTableContainer,
  HiscoreTable,
  HiscoreTableCell,
  HiscoreUsername,
  HiscoresTableRow,
  HiscoreTableHeaderCell,
} from './HiscoresTable.styled'
import { convertExp, getTotalExp } from '@helpers/hiscores/hiscoresUtils'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { push } from '@helpers/router'
import { HiscoresControls } from '@atoms/HiscoresControls'
import useHiscoresPagination from '@hooks/useHiscoresPagination'

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
          <TableHead>
            <HiscoresTableRow>
              <HiscoreTableHeaderCell>Rank</HiscoreTableHeaderCell>
              <HiscoreTableHeaderCell>Name</HiscoreTableHeaderCell>
              <HiscoreTableHeaderCell>Level</HiscoreTableHeaderCell>
              <HiscoreTableHeaderCell>EXP</HiscoreTableHeaderCell>
            </HiscoresTableRow>
          </TableHead>
          <TableBody>
            {hiscores?.slice(startingRecord, endingRecord).map((hiscoreRow, index) => {
              rank++
              return (
                <HiscoresTableRow key={hiscoreRow.username}>
                  <HiscoreTableCell component='th' scope='row'>
                    {startingRecord === 0 ? index + 1 : rank}
                  </HiscoreTableCell>
                  <HiscoreTableCell>
                    <HiscoreUsername href={`/hiscores/player/${hiscoreRow.username}`}>
                      {hiscoreRow.username}
                    </HiscoreUsername>
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
