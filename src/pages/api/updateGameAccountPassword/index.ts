import { NextApiRequest, NextApiResponse } from 'next'
import { User } from '@globalTypes/User'
import { handleManipulate } from '@helpers/api/apiHandler'

const handler = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  const { accountId, newPassword } = req.body
  const query = `UPDATE players SET pass = ? WHERE id = ?`

  return handleManipulate('game', query, res, [newPassword, accountId])
}

export default handler
