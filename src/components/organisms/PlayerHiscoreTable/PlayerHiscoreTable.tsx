import { TableContainer, Paper } from '@mui/material'
import { HiscoreTable } from '@molecules/HiscoresTable/HiscoresTable.styled'
import { HiscoreTableRow, PlayerHiscoreTableBody, PlayerHiscoreTableHead } from './PlayerHiscoreTable.styled'
import { ReactNode } from 'react'

type HiscoreTableProps = {
  accountName: string
  /** The columns, or header cells, for the table.
   * Pass a fragment with several `HiscoreTableCell` children. */
  columns: ReactNode
  /** The rows for the table. When setting this prop, map through
   * the hiscores and render a `HiscoreTableRow` containing cells with data values. */
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
