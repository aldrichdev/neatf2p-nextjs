import { PlayerDataRow } from '@globalTypes/Database/PlayerDataRow'
import { Spinner } from '@molecules/Spinner'
import { TableBody, Paper, Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { AccountTable, AccountTableContainer, MobileBodyText } from './GameAccountsTableMobile.styled'
import { GameAccountsTableProps } from '@organisms/GameAccountsTable/GameAccountsTable.types'
import { RenameAccountModal } from '@organisms/RenameAccountModal'
import { PasswordModal } from '@organisms/PasswordModal'
import { GameAccountRowMobile } from '@atoms/GameAccountRowMobile'
import { getPrettyDateStringFromMillis } from '@helpers/date/date'
import useGameAccounts from '@hooks/useGameAccounts'

const GameAccountsTableMobile = (props: GameAccountsTableProps) => {
  const {
    user,
    activeAccount,
    renameModalVisible,
    passwordModalVisible,
    setRenameModalVisible,
    setPasswordModalVisible,
    showRenameModal,
    showPasswordModal,
  } = props
  const [isLoading, setIsLoading] = useState(true)
  const accounts = useGameAccounts(user?.id)

  useEffect(() => {
    if (accounts) setIsLoading(false)
  }, [accounts])

  const handleRename = (account: PlayerDataRow) => {
    // Show a modal which handles the rename
    showRenameModal(true, account)
  }

  const handleUpdatePassword = (account: PlayerDataRow) => {
    showPasswordModal(true, account)
  }

  if (isLoading) {
    return <Spinner />
  } else if (accounts && accounts.length < 1) {
    return (
      <MobileBodyText variant='body'>You don&apos;t have any accounts right now. Why not create one?</MobileBodyText>
    )
  }

  return (
    <AccountTableContainer component={Paper}>
      {accounts?.map(account => (
        <AccountTable aria-label='simple table' key={`mobile-${account.id}`}>
          <TableBody>
            <GameAccountRowMobile account={account} rowLabel='Id' rowValue={account.id} />
            <GameAccountRowMobile account={account} rowLabel='Account Name' rowValue={account.username} />
            <GameAccountRowMobile account={account} rowLabel='Combat Level' rowValue={account.combat} />
            <GameAccountRowMobile
              account={account}
              rowLabel='Date Created'
              rowValue={getPrettyDateStringFromMillis(account.creation_date)}
            />
            <GameAccountRowMobile
              account={account}
              rowLabel='Last Login'
              rowValue={getPrettyDateStringFromMillis(account.login_date)}
            />
            <GameAccountRowMobile
              account={account}
              rowLabel='Rename?'
              rowValue={
                <Button variant='contained' onClick={() => handleRename(account)}>
                  Rename
                </Button>
              }
            />
            <GameAccountRowMobile
              account={account}
              rowLabel='Password'
              rowValue={
                <Button variant='contained' onClick={() => handleUpdatePassword(account)}>
                  Update
                </Button>
              }
            />
          </TableBody>
        </AccountTable>
      ))}
      {renameModalVisible && activeAccount && (
        <RenameAccountModal
          account={activeAccount}
          open={renameModalVisible}
          setOpen={setRenameModalVisible}
          user={user}
        />
      )}
      {passwordModalVisible && activeAccount && (
        <PasswordModal
          account={activeAccount}
          open={passwordModalVisible}
          setOpen={setPasswordModalVisible}
          user={user}
        />
      )}
    </AccountTableContainer>
  )
}

export default GameAccountsTableMobile
