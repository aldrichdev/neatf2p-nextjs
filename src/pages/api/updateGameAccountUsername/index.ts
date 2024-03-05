import { NextApiRequest, NextApiResponse } from 'next'
import { User } from '@globalTypes/User'
import { handleManipulate } from '@helpers/api/apiHandler'

const handler = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  const { accountId, currentName, newName } = req.body
  const query = `UPDATE players SET former_name = ?, username = ? WHERE id = ?`

  return handleManipulate('game', query, res, [currentName, newName, accountId])
}

export default handler
