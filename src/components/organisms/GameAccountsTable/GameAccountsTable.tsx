import { PlayerDataRow } from '@globalTypes/Database/PlayerDataRow'
import { Spinner } from '@molecules/Spinner'
import { TableBody, TableHead, TableRow, Paper } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { AccountTable, AccountTableCell, AccountTableContainer } from './GameAccountsTable.styled'
import { GameAccountRow } from '@atoms/GameAccountRow'
import { GameAccountsTableProps } from './GameAccountsTable.types'

const GameAccountsTable = (props: GameAccountsTableProps) => {
  const { user } = props
  const [isLoading, setIsLoading] = useState(true)
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

  if (isLoading) {
    return <Spinner />
  }

  return (
    <AccountTableContainer component={Paper}>
      <AccountTable sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <AccountTableCell>Id</AccountTableCell>
            <AccountTableCell align='right'>Account Name</AccountTableCell>
            <AccountTableCell align='right'>Combat Level</AccountTableCell>
            <AccountTableCell align='right'>Date Created</AccountTableCell>
            <AccountTableCell align='right'>Last Login</AccountTableCell>
            <AccountTableCell align='right'>Rename?</AccountTableCell>
            <AccountTableCell align='right'>Password</AccountTableCell>
          </TableRow>
        </TableHead>
        <TableBody>{accounts?.map(account => <GameAccountRow account={account} />)}</TableBody>
      </AccountTable>
    </AccountTableContainer>
  )
}

export default GameAccountsTable
