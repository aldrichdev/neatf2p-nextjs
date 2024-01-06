import { Button, TableRow } from '@mui/material'
import { StyledTableCell } from '@atoms/StyledTableCell'
import { GameAccountRowProps } from './GameAccountRow.types'
import { getPrettyDateStringFromMillis } from '@helpers/date/date'

const GameAccountRow = (props: GameAccountRowProps) => {
  const { account, showRenameModal, showPasswordModal } = props

  const handleRename = () => {
    // Show a modal which handles the rename
    showRenameModal(true, account)
  }

  const handleUpdatePassword = () => {
    console.log('update password requested')
    showPasswordModal(true, account)
  }

  return (
    <>
      <TableRow key={account.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <StyledTableCell component='th' scope='row'>
          {account.id}
        </StyledTableCell>
        <StyledTableCell align='right'>{account.username}</StyledTableCell>
        <StyledTableCell align='right'>{account.combat}</StyledTableCell>
        <StyledTableCell align='right'>{getPrettyDateStringFromMillis(account.creation_date)}</StyledTableCell>
        <StyledTableCell align='right'>{getPrettyDateStringFromMillis(account.login_date)}</StyledTableCell>
        <StyledTableCell align='right'>
          <Button variant='contained' onClick={handleRename}>
            Rename
          </Button>
        </StyledTableCell>
        <StyledTableCell align='right'>
          <Button variant='contained' onClick={handleUpdatePassword}>
            Update
          </Button>
        </StyledTableCell>
      </TableRow>
    </>
  )
}

export default GameAccountRow
