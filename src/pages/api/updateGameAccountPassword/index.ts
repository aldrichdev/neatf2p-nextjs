import { NextApiRequest, NextApiResponse } from 'next'
import { User } from '@globalTypes/User'
import { handleManipulate } from '@utils/api/apiHandler'
import { shouldBlockApiCall } from '@utils/api/apiUtils'

const handler = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  const { userId, accountId, newPassword } = req.body
  const sessionCookie = req.cookies?.['neat-f2p-session']

  if (await shouldBlockApiCall(userId, sessionCookie)) {
    res.statusCode = 403
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify('Forbidden'))
    return
  }

  const query = `UPDATE players SET pass = ? WHERE id = ? AND websiteUserId = ?`

  return handleManipulate('game', query, res, [newPassword, accountId, userId])
}

export default handler
