import { NextApiRequest, NextApiResponse } from 'next'
import { User } from '@globalTypes/User'
import { handleQuery } from '@helpers/api/apiHandler'
import { UserDataRow } from '@globalTypes/Database/Users/UserDataRow'

const handler = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  const { userId } = req.query
  const sessionCookie = req.headers?.['neat-f2p-session-cookie']

  if (!userId || typeof userId !== 'string' || !sessionCookie || typeof sessionCookie !== 'string') {
    res.statusCode = 400
    res.setHeader('Content-Type', 'application/json')
    res.end(
      JSON.stringify(
        `The user's session could not be retrieved due to a malformed request. 
        This could be due to the userId not being supplied, it not being a valid string, 
        or the user's session cookie not being valid.`,
      ),
    )
    return
  }

  const query = `SELECT COUNT(id) FROM users WHERE session = ? AND id = ?`

  return handleQuery<UserDataRow>('website', query, res, [sessionCookie, userId])
}

export default handler
