import { NextApiRequest, NextApiResponse } from 'next'
import { handleUpdate } from '@helpers/apiHandler'
import { User } from '@globalTypes/User'

const handler = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  const { userId, newPassword, newPasswordSalt } = req.body
  const now = new Date().toISOString()
  const query = `UPDATE users SET password = '${newPassword}', passwordSalt = '${newPasswordSalt}', dateModified = '${now}'  WHERE id = '${userId}'`

  return handleUpdate('website', query, res)
}

export default handler
