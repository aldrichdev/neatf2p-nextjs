import { NextApiRequest, NextApiResponse } from 'next'
import { handleManipulate } from '@helpers/apiHandler'
import { User } from '@globalTypes/User'

const handler = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  const { userId, newEmail } = req.body
  const now = new Date().toISOString()
  const query = `UPDATE users SET emailAddress = '${newEmail}', dateModified = '${now}' WHERE id = '${userId}'`

  return handleManipulate('website', query, res)
}

export default handler