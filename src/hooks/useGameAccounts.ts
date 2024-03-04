import { PlayerDataRow } from '@globalTypes/Database/PlayerDataRow'
import { sendApiRequest } from '@helpers/api/apiUtils'
import { useEffect, useState } from 'react'

const useGameAccounts = (userId: string | undefined) => {
  const [accounts, setAccounts] = useState<PlayerDataRow[] | undefined>(undefined)

  useEffect(() => {
    const fetchGameAccounts = () => {
      sendApiRequest('GET', `/api/getGameAccountsForUser?userId=${userId}`)
        .then(response => {
          setAccounts(response.data)
        })
        .catch((error: string) => console.log(error))
    }

    if (accounts === undefined) {
      fetchGameAccounts()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return accounts
}

export default useGameAccounts
