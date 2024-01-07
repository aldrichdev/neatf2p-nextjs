import { NextApiRequest, NextApiResponse } from 'next'
import { queryDatabase } from '@helpers/db'
import { ErrorResult } from '@globalTypes/Database/ErrorResult'
import { User } from '@globalTypes/User'
import { PlayerDataRow } from '@globalTypes/Database/PlayerDataRow'

const handler = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  const query = `SELECT username FROM players`

  // TODO: Could we make this into a shared handler that works with `PlayerDataRow`s?
  try {
    const response: PlayerDataRow[] | ErrorResult = await queryDatabase('game', query)

    if (response instanceof Array) {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(response))
    } else {
      throw new Error(response.error?.toString())
    }
  } catch (error) {
    console.log('An error occurred in the getExistingUserInfo API: ', error)
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(error?.toString()))
  }
}

export default handler
