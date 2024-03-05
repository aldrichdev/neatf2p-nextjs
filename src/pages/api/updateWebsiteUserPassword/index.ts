import { NextApiRequest, NextApiResponse } from 'next'
import { handleManipulate } from '@helpers/api/apiHandler'
import { User } from '@globalTypes/User'

const handler = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  const { userId, newPassword, newPasswordSalt } = req.body
  const now = new Date().toISOString()
  const query = `UPDATE users SET password = ?, passwordSalt = ?, dateModified = ? WHERE id = ?`

  return handleManipulate('website', query, res, [newPassword, newPasswordSalt, now, userId])
}

export default handler
