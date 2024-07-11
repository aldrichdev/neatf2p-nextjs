import { NpcHiscoreType } from '@globalTypes/Hiscores/HiscoreType'
import { TableBody, TableHead, Paper } from '@mui/material'
import {
  RootContainer,
  HiscoreTableContainer,
  HiscoreTable,
  HiscoreTableCell,
  HiscoreUsername,
  HiscoresTableRow,
} from './HiscoresTable.styled'
import { getNpcNameById } from '@helpers/hiscores/hiscoresUtils'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { push } from '@helpers/router'
import { HiscoresControls } from '@atoms/HiscoresControls'
import { NpcHiscoreDataRow } from '@globalTypes/Database/NpcHiscoreDataRow'

type NpcHiscoresTableProps = {
  hiscores: NpcHiscoreDataRow[]
  npcHiscoreType: NpcHiscoreType
  page: number
  setPage: (value: number) => void
}

const NpcHiscoresTable = (props: NpcHiscoresTableProps) => {
  const { hiscores, npcHiscoreType, page, setPage } = props
  const router = useRouter()
  const resultsPerPage = 20
  const pageCount = Math.ceil(hiscores.length / resultsPerPage)
  const startingRecord = page === 1 ? 0 : (page - 1) * resultsPerPage
  const endingRecord = page == 1 ? resultsPerPage : startingRecord + resultsPerPage
  let rank = startingRecord

  // TODO: Can we put this in the HiscoresControls component or maybe a new hook?
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
    router.query.page = value.toString()
    push(router, '/npc-hiscores', router.query)
  }

  const handleScrollToTop = () => {
    window.scrollTo({ top: 525, behavior: 'smooth' })
  }

  useEffect(() => {
    router.query.page = page.toString()
    push(router, '/npc-hiscores', router.query)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  return (
    <RootContainer data-what-is-rendering-2>
      <HiscoreTableContainer component={Paper}>
        <HiscoreTable aria-label={`${getNpcNameById(npcHiscoreType)} Hiscores Table`}>
          <TableHead>
            <HiscoresTableRow isNpcHiscores>
              <HiscoreTableCell sx={{ fontWeight: 700 }} isNpcHiscores>
                Rank
              </HiscoreTableCell>
              <HiscoreTableCell sx={{ fontWeight: 700 }} isNpcHiscores>
                Name
              </HiscoreTableCell>
              <HiscoreTableCell sx={{ fontWeight: 700 }} isNpcHiscores>
                Kills
              </HiscoreTableCell>
            </HiscoresTableRow>
          </TableHead>
          <TableBody>
            {hiscores?.slice(startingRecord, endingRecord).map((hiscoreRow, index) => {
              rank++
              return (
                <HiscoresTableRow key={hiscoreRow.username} isNpcHiscores>
                  <HiscoreTableCell component='th' scope='row' isNpcHiscores>
                    {startingRecord === 0 ? index + 1 : rank}
                  </HiscoreTableCell>
                  <HiscoreTableCell isNpcHiscores>
                    <HiscoreUsername href={`/npc-hiscores/player/${hiscoreRow.username}`}>
                      {hiscoreRow.username}
                    </HiscoreUsername>
                  </HiscoreTableCell>
                  <HiscoreTableCell isNpcHiscores data-kills>
                    {hiscoreRow.killCount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </HiscoreTableCell>
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

export default NpcHiscoresTable
