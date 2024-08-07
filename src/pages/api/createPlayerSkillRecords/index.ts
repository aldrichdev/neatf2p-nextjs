import { NextApiRequest, NextApiResponse } from 'next'
import { User } from '@globalTypes/User'
import { handleManipulate } from '@helpers/api/apiHandler'
import { shouldBlockApiCall } from '@helpers/api/apiUtils'

const handler = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  const { userId, playerId } = req.body
  const sessionCookie = req.cookies?.['neat-f2p-session']

  if (await shouldBlockApiCall(userId, sessionCookie)) {
    res.statusCode = 403
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify('Forbidden'))
    return
  }

  const query = `CALL CreatePlayerSkillRecords(?)`

  return handleManipulate('game', query, res, [playerId])
}

export default handler
