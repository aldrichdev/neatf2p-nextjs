import { TableRow, Button } from '@mui/material'
import { AccountTableCell } from '@organisms/GameAccountsTable/GameAccountsTable.styled'
import { GameAccountRowProps } from './GameAccountRow.types'

const GameAccountRow = (props: GameAccountRowProps) => {
  const { account } = props

  const handleRename = () => {
    console.log('rename requested')

    // NO idea how i'll get the ID here..
    const theId = account.id // That's how
  }

  const handleUpdatePassword = () => {
    console.log('update password requested')
  }

  return (
    <TableRow key={account.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <AccountTableCell component='th' scope='row'>
        {account.id}
      </AccountTableCell>
      <AccountTableCell align='right'>{account.username}</AccountTableCell>
      <AccountTableCell align='right'>{account.combat}</AccountTableCell>
      <AccountTableCell align='right'>{new Date(account.creation_date).toISOString()}</AccountTableCell>
      <AccountTableCell align='right'>{new Date(account.login_date).toISOString()}</AccountTableCell>
      <AccountTableCell align='right'>
        <Button variant='contained' onClick={handleRename}>
          Rename
        </Button>
      </AccountTableCell>
      <AccountTableCell align='right'>
        <Button variant='contained' onClick={handleUpdatePassword}>
          Update
        </Button>
      </AccountTableCell>
    </TableRow>
  )
}

export default GameAccountRow
