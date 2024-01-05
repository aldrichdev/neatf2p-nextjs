import { NextApiRequest, NextApiResponse } from 'next'
import { User } from '@globalTypes/User'
import { handleUpdate } from '@helpers/apiHandler'

const handler = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  const { accountId, currentName, newName } = req.body
  const query = `UPDATE players SET former_name = '${currentName}', username = '${newName}' WHERE id = ${accountId}`

  return handleUpdate('game', query, res)
}

export default handler
