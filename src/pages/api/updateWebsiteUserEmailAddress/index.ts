import { NextApiRequest, NextApiResponse } from 'next'
import { handleManipulate } from '@helpers/api/apiHandler'
import { User } from '@globalTypes/User'
import { shouldBlockApiCall } from '@helpers/api/apiUtils'

const handler = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  const { userId, newEmail } = req.body
  const now = new Date().toISOString()
  const sessionCookie = req.cookies?.['neat-f2p-session']

  if (await shouldBlockApiCall(userId, sessionCookie)) {
    res.statusCode = 403
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(`Forbidden`))
    return
  }

  const query = `UPDATE users SET emailAddress = ?, dateModified = ? WHERE id = ?`

  return handleManipulate('website', query, res, [newEmail, now, userId])
}

export default handler
