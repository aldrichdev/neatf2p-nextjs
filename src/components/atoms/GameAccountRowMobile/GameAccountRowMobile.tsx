import { TableRow } from '@mui/material'
import { StyledTableCell } from '@atoms/StyledTableCell'
import { GameAccountRowMobileProps } from './GameAccountRowMobile.types'

const GameAccountRowMobile = (props: GameAccountRowMobileProps) => {
  const { account, rowLabel, rowValue } = props

  // TODO: Determine if key is needed below
  return (
    <>
      <TableRow key={account.id}>
        <StyledTableCell align='right' bold>
          {rowLabel}
        </StyledTableCell>
        <StyledTableCell align='right'>{rowValue}</StyledTableCell>
      </TableRow>
    </>
  )
}

export default GameAccountRowMobile
