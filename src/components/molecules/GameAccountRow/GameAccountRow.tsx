import { Button, TableRow } from '@mui/material'
import { StyledTableCell } from '@atoms/StyledTableCell'
import { GameAccountRowProps } from './GameAccountRow.types'
import { getPrettyDateStringFromMillis } from '@helpers/date/date'
import { CharacterInfoButton } from '@atoms/CharacterInfoButton'

const GameAccountRow = (props: GameAccountRowProps) => {
  const { account, showRenameModal, showPasswordModal, showCharacterInfoModal } = props

  const handleRename = () => {
    // Show a modal which handles the rename
    showRenameModal(account)
  }

  const handleUpdatePassword = () => {
    showPasswordModal(account)
  }

  const handleCharacterInfoClick = () => {
    showCharacterInfoModal(account)
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
        <StyledTableCell align='right'>
          <CharacterInfoButton handleClick={handleCharacterInfoClick} />
        </StyledTableCell>
      </TableRow>
    </>
  )
}

export default GameAccountRow
