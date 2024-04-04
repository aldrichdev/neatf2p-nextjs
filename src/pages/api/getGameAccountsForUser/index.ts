import { ErrorResult } from '@globalTypes/Database/ErrorResult'
import { PlayerDataRow } from '@globalTypes/Database/PlayerDataRow'
import { shouldBlockApiCall } from '@helpers/api/apiUtils'
import { queryDatabase } from '@helpers/db'
import { NextApiRequest, NextApiResponse } from 'next'

interface Props {
  onlinePlayerCount: number
}

const handler = async (req: NextApiRequest, res: NextApiResponse<Props>) => {
  const { userId } = req.query
  const sessionCookie = req.cookies?.['neat-f2p-session']

  if (!userId || typeof userId !== 'string') {
    res.statusCode = 400
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify('Missing or malformed userId provided to getGameAccountsForUser.'))
    return
  }

  if (await shouldBlockApiCall(userId, sessionCookie)) {
    res.statusCode = 403
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify('Forbidden'))
    return
  }

  const query = `SELECT id, username, former_name, combat, creation_date, login_date, banned
    FROM players
    WHERE websiteUserId = ?`

  try {
    const response: PlayerDataRow[] | ErrorResult = await queryDatabase('game', query, [userId])

    if (response instanceof Array) {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(response))
    } else {
      throw new Error(response.error?.toString())
    }
  } catch (error) {
    console.log('An error occurred in the getGameAccountsForUser API: ', error)
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(error?.toString()))
  }
}

export default handler
