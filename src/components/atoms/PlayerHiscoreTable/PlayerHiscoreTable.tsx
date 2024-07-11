import { TableContainer, Paper } from '@mui/material'
import { HiscoreTable } from '@atoms/HiscoresTable/HiscoresTable.styled'
import { HiscoreTableRow, PlayerHiscoreTableBody, PlayerHiscoreTableHead } from './PlayerHiscoreTable.styled'
import { ReactNode } from 'react'

type HiscoreTableProps = {
  accountName: string
  /** Use an array of `HiscoreTableCell` elements. */
  columns: ReactNode
  /** Use map() on the hiscore array and render a `HiscoreTableRow` containing cells with data values. */
  body: ReactNode
  isNpcHiscores?: boolean
}

const PlayerHiscoreTable = (props: HiscoreTableProps) => {
  const { accountName, columns, body, isNpcHiscores } = props

  return (
    <TableContainer component={Paper} sx={{ boxShadow: 'none' }} data-what-is-rendering>
      <HiscoreTable isNpcHiscores={isNpcHiscores} aria-label={`${accountName} Hiscore Table`}>
        <PlayerHiscoreTableHead isNpcHiscores={isNpcHiscores}>
          <HiscoreTableRow isNpcHiscores={isNpcHiscores}>{columns}</HiscoreTableRow>
        </PlayerHiscoreTableHead>
        <PlayerHiscoreTableBody isNpcHiscores={isNpcHiscores}>{body}</PlayerHiscoreTableBody>
      </HiscoreTable>
    </TableContainer>
  )
}

export default PlayerHiscoreTable
