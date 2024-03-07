import { NextApiRequest, NextApiResponse } from 'next'
import { User } from '@globalTypes/User'
import { handleManipulate } from '@helpers/api/apiHandler'
import { shouldBlockApiCall } from '@helpers/api/apiUtils'

const handler = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  const { userId, accountName, password, websiteAccountId, userIp } = req.body
  const creationDateMillis = Math.round(new Date().getTime() / 1000)
  const sessionCookie = req.cookies?.['neat-f2p-session']

  if (await shouldBlockApiCall(userId, sessionCookie)) {
    res.statusCode = 403
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(`Forbidden`))
    return
  }

  const query = `INSERT INTO players (username, pass, creation_date, creation_ip, websiteUserId)
    SELECT ?, ?, ?, ?, ? FROM DUAL
    WHERE NOT EXISTS (SELECT * FROM players WHERE username = ? LIMIT 1)`

  // Create the player record and return the new record ID.
  return handleManipulate(
    'game',
    query,
    res,
    [accountName, password, creationDateMillis, userIp, websiteAccountId, accountName],
    true,
  )
}

export default handler
