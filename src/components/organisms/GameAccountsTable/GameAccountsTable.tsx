import { PlayerDataRow } from '@globalTypes/Database/PlayerDataRow'
import { Spinner } from '@molecules/Spinner'
import { TableBody, TableHead, TableRow, Paper } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { AccountTable, AccountTableCell, AccountTableContainer } from './GameAccountsTable.styled'
import { GameAccountRow } from '@atoms/GameAccountRow'
import { GameAccountsTableProps } from './GameAccountsTable.types'
import { RenameAccountModal } from '@molecules/RenameAccountModal'
import { PasswordModal } from '@molecules/PasswordModal'

const GameAccountsTable = (props: GameAccountsTableProps) => {
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

  if (isLoading) {
    return <Spinner />
  }

  return (
    <AccountTableContainer component={Paper}>
      <AccountTable sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <AccountTableCell align='right' bold>
              Id
            </AccountTableCell>
            <AccountTableCell align='right' bold>
              Account Name
            </AccountTableCell>
            <AccountTableCell align='right' bold>
              Combat Level
            </AccountTableCell>
            <AccountTableCell align='right' bold>
              Date Created
            </AccountTableCell>
            <AccountTableCell align='right' bold>
              Last Login
            </AccountTableCell>
            <AccountTableCell align='right' bold>
              Rename?
            </AccountTableCell>
            <AccountTableCell align='right' bold>
              Password
            </AccountTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accounts?.map(account => (
            <GameAccountRow
              key={account.id}
              account={account}
              showRenameModal={showRenameModal}
              showPasswordModal={showPasswordModal}
            />
          ))}
        </TableBody>
      </AccountTable>
      {renameModalVisible && activeAccount && (
        <RenameAccountModal account={activeAccount} open={renameModalVisible} setOpen={setRenameModalVisible} />
      )}
      {passwordModalVisible && activeAccount && (
        <PasswordModal account={activeAccount} open={passwordModalVisible} setOpen={setPasswordModalVisible} />
      )}
    </AccountTableContainer>
  )
}

export default GameAccountsTable
