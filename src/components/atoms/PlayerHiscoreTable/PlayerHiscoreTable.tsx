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
  /** Whether this component is used to render NPC kill hiscores.
   * Needed, since the NPC table has less columns, and thus, different styling.
   */
  isNpcTable?: boolean
}

const PlayerHiscoreTable = (props: HiscoreTableProps) => {
  const { accountName, columns, body, isNpcTable } = props

  return (
    <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
      <HiscoreTable aria-label={`${accountName} Hiscore Table`}>
        <PlayerHiscoreTableHead>
          <HiscoreTableRow isNpcTable={isNpcTable}>{columns}</HiscoreTableRow>
        </PlayerHiscoreTableHead>
        <PlayerHiscoreTableBody>{body}</PlayerHiscoreTableBody>
      </HiscoreTable>
    </TableContainer>
  )
}

export default PlayerHiscoreTable
