import { TableRow } from '@mui/material'
import { StyledTableCell } from '@atoms/StyledTableCell'
import { GameAccountRowMobileProps } from './GameAccountRowMobile.types'

const GameAccountRowMobile = (props: GameAccountRowMobileProps) => {
  const { rowLabel, rowValue } = props

  return (
    <>
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <StyledTableCell align='right' bold>
          {rowLabel}
        </StyledTableCell>
        <StyledTableCell align='right'>{rowValue}</StyledTableCell>
      </TableRow>
    </>
  )
}

export default GameAccountRowMobile
