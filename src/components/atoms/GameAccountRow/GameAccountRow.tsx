import { TableRow } from '@mui/material'
import { AccountTableCell } from '@organisms/GameAccountsTable/GameAccountsTable.styled'
import { GameAccountRowProps } from './GameAccountRow.types'
import { TableButton } from '@atoms/TableButton/TableButton'
import { getFullDateStringFromMillis } from '@helpers/date/date'

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
        <AccountTableCell component='th' scope='row'>
          {account.id}
        </AccountTableCell>
        <AccountTableCell align='right'>{account.username}</AccountTableCell>
        <AccountTableCell align='right'>{account.combat}</AccountTableCell>
        <AccountTableCell align='right'>{getFullDateStringFromMillis(account.creation_date)}</AccountTableCell>
        <AccountTableCell align='right'>{getFullDateStringFromMillis(account.login_date)}</AccountTableCell>
        <AccountTableCell align='right'>
          <TableButton variant='contained' onClick={handleRename}>
            Rename
          </TableButton>
        </AccountTableCell>
        <AccountTableCell align='right'>
          <TableButton variant='contained' onClick={handleUpdatePassword}>
            Update
          </TableButton>
        </AccountTableCell>
      </TableRow>
    </>
  )
}

export default GameAccountRow
