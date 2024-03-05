import { NextApiRequest, NextApiResponse } from 'next'
import { handleManipulate } from '@helpers/api/apiHandler'
import { User } from '@globalTypes/User'

const handler = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  const { userId, newUsername } = req.body
  const now = new Date().toISOString()
  const query = `UPDATE users SET username = ?, dateModified = ? WHERE id = ?`

  return handleManipulate('website', query, res, [newUsername, now, userId])
}

export default handler
