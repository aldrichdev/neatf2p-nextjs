import { NextApiRequest, NextApiResponse } from 'next'
import { User } from '@globalTypes/User'
import { handleManipulate } from '@helpers/api/apiHandler'

const handler = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  const { userId, userIp } = req.body
  const now = new Date().toISOString()
  const query = `UPDATE users SET session = ?, lastLogin = ?, loginIp = ?, dateModified = ? WHERE id = ?`

  return handleManipulate('website', query, res, [req.cookies?.['neat-f2p-session'], now, userIp, now, userId])
}

export default handler
