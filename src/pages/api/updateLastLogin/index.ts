import { NextApiRequest, NextApiResponse } from 'next'
import { User } from '@globalTypes/User'
import { handleManipulate } from '@helpers/api/apiHandler'

const handler = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  const { userId } = req.body
  const now = new Date().toISOString()
  const query = `UPDATE users SET lastLogin = ?, dateModified = ? WHERE id = ?`

  return handleManipulate('website', query, res, [now, now, userId])
}

export default handler
