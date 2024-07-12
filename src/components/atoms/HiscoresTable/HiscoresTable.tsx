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
  const { handlePageChange, handleScrollToTop } = useHiscoresPagination(setPage)
  const resultsPerPage = 20
  const pageCount = Math.ceil(hiscores.length / resultsPerPage)
  const startingRecord = page === 1 ? 0 : (page - 1) * resultsPerPage
  const endingRecord = page == 1 ? resultsPerPage : startingRecord + resultsPerPage
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
              <HiscoreTableCell sx={{ fontWeight: 700 }}>Rank</HiscoreTableCell>
              <HiscoreTableCell sx={{ fontWeight: 700 }}>Name</HiscoreTableCell>
              <HiscoreTableCell sx={{ fontWeight: 700 }}>Level</HiscoreTableCell>
              <HiscoreTableCell sx={{ fontWeight: 700 }}>EXP</HiscoreTableCell>
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
