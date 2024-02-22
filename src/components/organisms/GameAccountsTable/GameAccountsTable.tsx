import { Spinner } from '@molecules/Spinner'
import { TableBody, TableHead, TableRow, Paper } from '@mui/material'
import { useEffect, useState } from 'react'
import { AccountTable, AccountTableContainer, TabletDesktopBodyText } from './GameAccountsTable.styled'
import { GameAccountRow } from '@atoms/GameAccountRow'
import { GameAccountsTableProps } from './GameAccountsTable.types'
import { RenameAccountModal } from '@organisms/RenameAccountModal'
import { PasswordModal } from '@organisms/PasswordModal'
import { StyledTableCell } from '@atoms/StyledTableCell'
import useGameAccounts from '@hooks/useGameAccounts'

const GameAccountsTable = (props: GameAccountsTableProps) => {
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

  if (isLoading) {
    return <Spinner />
  } else if (process.env.NEXT_PUBLIC_GAME_ACCOUNTS_DISABLE_CREATION === 'true') {
    return null
  } else if (accounts && accounts.length < 1) {
    return (
      <TabletDesktopBodyText variant='body' textAlign='center'>
        You don&apos;t have any accounts right now. Why not create one?
      </TabletDesktopBodyText>
    )
  }

  return (
    <AccountTableContainer component={Paper}>
      <AccountTable aria-label='Game Accounts Table'>
        <TableHead>
          <TableRow>
            <StyledTableCell align='right' bold>
              Id
            </StyledTableCell>
            <StyledTableCell align='right' bold>
              Account Name
            </StyledTableCell>
            <StyledTableCell align='right' bold>
              Combat Level
            </StyledTableCell>
            <StyledTableCell align='right' bold>
              Date Created
            </StyledTableCell>
            <StyledTableCell align='right' bold>
              Last Login
            </StyledTableCell>
            <StyledTableCell align='right' bold>
              Rename?
            </StyledTableCell>
            <StyledTableCell align='right' bold>
              Password
            </StyledTableCell>
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
