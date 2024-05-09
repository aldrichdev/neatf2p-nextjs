import { ErrorResult } from '@globalTypes/Database/ErrorResult'
import { PlayerDataRow } from '@globalTypes/Database/PlayerDataRow'
import { shouldBlockApiCall } from '@helpers/api/apiUtils'
import { queryDatabase } from '@helpers/db'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
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

  const query = `SELECT p.id, p.username, p.former_name, p.combat, p.creation_date, p.login_date, p.banned, 
    pc.value/60/60/1000 AS hours_played
    FROM players p
    LEFT JOIN player_cache pc ON pc.playerID = p.id
    AND pc.key LIKE "total_played"
    WHERE websiteUserId = ?
    ORDER by p.id`

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
