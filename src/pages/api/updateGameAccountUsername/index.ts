import { NextApiRequest, NextApiResponse } from 'next'
import { User } from '@globalTypes/User'
import { handleManipulate } from '@helpers/api/apiHandler'
import { shouldBlockApiCall } from '@helpers/api/apiUtils'

const handler = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  const { userId, accountId, currentName, newName } = req.body
  const sessionCookie = req.cookies?.['neat-f2p-session']

  if (await shouldBlockApiCall(userId, sessionCookie)) {
    res.statusCode = 403
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify('Forbidden'))
    return
  }

  const query = `UPDATE players SET former_name = ?, username = ? WHERE id = ? AND websiteUserId = ?
    AND NOT EXISTS (SELECT username FROM players WHERE username = ?) AND former_name = ''`

  return handleManipulate('game', query, res, [currentName, newName, accountId, userId, newName])
}

export default handler
