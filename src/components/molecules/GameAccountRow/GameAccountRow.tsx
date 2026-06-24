import { GameAccountsTableCell } from '@atoms/GameAccountsTableCell'
import { GameAccountRowProps } from './GameAccountRow.types'
import { getPrettyDateStringFromMillis } from '@utils/date/date'
import { CharacterInfoButton } from '@atoms/CharacterInfoButton'
import { Button } from '@ui/button'

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
      <tr>
        <GameAccountsTableCell>{account.id}</GameAccountsTableCell>
        <GameAccountsTableCell>{account.username}</GameAccountsTableCell>
        <GameAccountsTableCell>{account.combat}</GameAccountsTableCell>
        <GameAccountsTableCell>
          {account.login_date === 0 ? '-' : getPrettyDateStringFromMillis(account.login_date)}
        </GameAccountsTableCell>
        <GameAccountsTableCell>
          <Button onClick={handleRename}>Rename</Button>
        </GameAccountsTableCell>
        <GameAccountsTableCell>
          <Button onClick={handleUpdatePassword}>Update</Button>
        </GameAccountsTableCell>
        <GameAccountsTableCell>
          <CharacterInfoButton handleClick={handleCharacterInfoClick} />
        </GameAccountsTableCell>
      </tr>
    </>
  )
}

export default GameAccountRow
