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
    showPasswordModal(true, account)
  }

  return (
    <>
      <TableRow>
        <StyledTableCell component='th' scope='row'>
          {account.id}
        </StyledTableCell>
        <StyledTableCell align='right'>{account.username}</StyledTableCell>
        <StyledTableCell align='right'>{account.combat}</StyledTableCell>
        <StyledTableCell align='right'>
          {account.creation_date === 0 ? '-' : getPrettyDateStringFromMillis(account.creation_date)}
        </StyledTableCell>
        <StyledTableCell align='right'>
          {account.login_date === 0 ? '-' : getPrettyDateStringFromMillis(account.login_date)}
        </StyledTableCell>
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
