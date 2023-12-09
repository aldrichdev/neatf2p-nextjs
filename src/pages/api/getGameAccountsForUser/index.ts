import { ErrorResult } from '@globalTypes/Database/ErrorResult'
import { PlayerDataRow } from '@globalTypes/Database/PlayerDataRow'
import { queryGameDatabase } from '@helpers/db'
import { NextApiRequest, NextApiResponse } from 'next'

interface Props {
  onlinePlayerCount: number
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Props>) => {
  const { userId } = req.query
  const query = `SELECT id, username, pass, salt, combat, creation_date, login_date, banned
    FROM players
    WHERE websiteUserId = ${userId}`

  try {
    const response: PlayerDataRow[] | ErrorResult = await queryGameDatabase(query)
    console.log('response', response)

    if (response instanceof Array) {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(response))
    } else {
      throw new Error(response.error?.toString())
    }
  } catch (error) {
    console.log('An error occurred in the getMatchingUsers API: ', error)
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(error?.toString()))
  }
}

export default handler
