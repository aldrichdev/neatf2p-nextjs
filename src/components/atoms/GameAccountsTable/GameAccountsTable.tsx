import { PlayerDataRow } from '@globalTypes/Database/PlayerDataRow'
import { GameAccount } from '@globalTypes/GameAccount'
import { User } from '@globalTypes/User'
import { Spinner } from '@molecules/Spinner'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'

interface GameAccountsTableProps {
  user?: User
}

const GameAccountsTable = (props: GameAccountsTableProps) => {
  const { user } = props
  const [isLoading, setIsLoading] = useState(true)
  const [accounts, setAccounts] = useState<PlayerDataRow[] | undefined>(undefined)

  useEffect(() => {
    console.log('running useeffect')
    const fetchGameAccounts = () => {
      axios
        .get(`/api/getGameAccountsForUser?userId=${user?.id}`)
        .then(response => {
          console.log('response.data', response.data)
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

  const handleRename = () => {
    console.log('rename requested')
    // NO idea how i'll get the ID here..
  }

  const handleUpdatePassword = () => {
    console.log('update password requested')
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell align='right'>Account Name</TableCell>
            <TableCell align='right'>Combat Level</TableCell>
            <TableCell align='right'>Date Created</TableCell>
            <TableCell align='right'>Last Login</TableCell>
            <TableCell align='right'>Rename?</TableCell>
            <TableCell align='right'>Password</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accounts?.map(account => (
            <TableRow key={account.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component='th' scope='row'>
                {account.id}
              </TableCell>
              <TableCell align='right'>{account.username}</TableCell>
              <TableCell align='right'>{account.combat}</TableCell>
              <TableCell align='right'>{account.creation_date}</TableCell>
              <TableCell align='right'>{account.login_date}</TableCell>
              <TableCell align='right'>
                <Button variant='contained' onClick={handleRename}>
                  Rename
                </Button>
              </TableCell>
              <TableCell align='right'>
                <Button variant='contained' onClick={handleUpdatePassword}>
                  Update
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default GameAccountsTable
