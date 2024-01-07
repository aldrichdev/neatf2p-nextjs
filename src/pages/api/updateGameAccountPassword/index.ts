import { NextApiRequest, NextApiResponse } from 'next'
import { User } from '@globalTypes/User'
import { handleUpdate } from '@helpers/apiHandler'

const handler = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  const { accountId, newPassword } = req.body
  const query = `UPDATE players SET pass = '${newPassword}' WHERE id = ${accountId}`

  return handleUpdate('game', query, res)
}

export default handler
