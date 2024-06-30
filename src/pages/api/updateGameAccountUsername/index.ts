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

  // The 2nd line ensures that the case-sensitive new name isn't taken.
  // The 3rd line ensures that the username returned from the search is theirs.
  const query = `UPDATE players SET former_name = ?, username = ? WHERE id = ? AND websiteUserId = ?
    AND NOT EXISTS (SELECT username FROM players WHERE BINARY username = ?) 
      AND ? IN (SELECT username FROM players WHERE websiteUserId = ?)
        AND former_name = ''`

  return handleManipulate('game', query, res, [currentName, newName, accountId, userId, newName, currentName, userId])
}

export default handler
