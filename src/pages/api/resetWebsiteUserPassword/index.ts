import { NextApiRequest, NextApiResponse } from 'next'
import { handleManipulate } from '@helpers/api/apiHandler'
import { User } from '@globalTypes/User'
import { ResetTokenHasExpired } from '@helpers/users/users'

const handler = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  const { userId, resetToken, dateModifiedMillis, newPassword, newPasswordSalt } = req.body
  const now = new Date().toISOString()

  // We need to check if the token has expired, and do nothing if it has.
  if (ResetTokenHasExpired(dateModifiedMillis)) {
    res.statusCode = 401
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify('Unauthorized'))
    return
  }

  const query = `UPDATE users SET password = ?, passwordSalt = ?, dateModified = ? WHERE id = ? AND resetToken = ?`

  return handleManipulate('website', query, res, [newPassword, newPasswordSalt, now, userId, resetToken])
}

export default handler
