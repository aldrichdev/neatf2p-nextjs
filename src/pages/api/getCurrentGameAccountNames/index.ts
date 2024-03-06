import { NextApiRequest, NextApiResponse } from 'next'
import { queryDatabase } from '@helpers/db'
import { ErrorResult } from '@globalTypes/Database/ErrorResult'
import { User } from '@globalTypes/User'
import { PlayerDataRow } from '@globalTypes/Database/PlayerDataRow'
import { shouldBlockApiCall } from '@helpers/api/apiUtils'

const handler = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  const userId = req.headers?.['userid']
  const sessionCookie = req.cookies?.['neat-f2p-session']

  if (!userId || typeof userId !== 'string') {
    res.statusCode = 400
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify('Missing or malformed userId provided to getCurrentGameAccountNames.'))
    return
  }

  if (await shouldBlockApiCall(userId, sessionCookie)) {
    res.statusCode = 403
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(`Forbidden`))
    return
  }

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
    console.log('An error occurred in the getCurrentGameAccountNames API: ', error)
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(error?.toString()))
  }
}

export default handler
