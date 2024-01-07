import { PlayerDataRow } from '@globalTypes/Database/PlayerDataRow'
import { Spinner } from '@molecules/Spinner'
import { TableBody, Paper, Button } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { AccountTable, AccountTableContainer, MobileBodyText } from './GameAccountsTableMobile.styled'
import { GameAccountsTableProps } from './GameAccountsTableMobile.types'
import { RenameAccountModal } from '@organisms/RenameAccountModal'
import { PasswordModal } from '@organisms/PasswordModal'
import { GameAccountRowMobile } from '@atoms/GameAccountRowMobile'
import { getPrettyDateStringFromMillis } from '@helpers/date/date'

// TODO: Refactor `GameAccountsTable` and `GameAccountsTableMobile` so they share code.
const GameAccountsTableMobile = (props: GameAccountsTableProps) => {
  const { user } = props
  const [isLoading, setIsLoading] = useState(true)
  const [activeAccount, setActiveAccount] = useState<PlayerDataRow>()
  const [renameModalVisible, setRenameModalVisible] = useState(false)
  const [passwordModalVisible, setPasswordModalVisible] = useState(false)
  const [accounts, setAccounts] = useState<PlayerDataRow[] | undefined>(undefined)

  useEffect(() => {
    const fetchGameAccounts = () => {
      axios
        .get(`/api/getGameAccountsForUser?userId=${user?.id}`)
        .then(response => {
          setAccounts(response.data)
          setIsLoading(false)
        })
        .catch((error: string) => console.log(error))
    }

    if (accounts === undefined) {
      fetchGameAccounts()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const showRenameModal = (visible: boolean, account: PlayerDataRow) => {
    setRenameModalVisible(true)
    setActiveAccount(account)
  }

  const showPasswordModal = (visible: boolean, account: PlayerDataRow) => {
    setPasswordModalVisible(true)
    setActiveAccount(account)
  }

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
        <RenameAccountModal account={activeAccount} open={renameModalVisible} setOpen={setRenameModalVisible} />
      )}
      {passwordModalVisible && activeAccount && (
        <PasswordModal account={activeAccount} open={passwordModalVisible} setOpen={setPasswordModalVisible} />
      )}
    </AccountTableContainer>
  )
}

export default GameAccountsTableMobile
