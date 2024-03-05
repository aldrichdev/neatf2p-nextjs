import { NextApiRequest, NextApiResponse } from 'next'
import { User } from '@globalTypes/User'
import { handleManipulate } from '@helpers/api/apiHandler'

const handler = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  const { playerId } = req.body
  const query = `CALL CreatePlayerSkillRecords(?)`

  return handleManipulate('game', query, res, [playerId])
}

export default handler
