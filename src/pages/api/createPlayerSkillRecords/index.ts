import { NextApiRequest, NextApiResponse } from 'next'
import { User } from '@globalTypes/User'
import { handleManipulate } from '@helpers/apiHandler'

const handler = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  const { playerId } = req.body
  const query = `CALL CreatePlayerSkillRecords(${playerId})`

  return handleManipulate('game', query, res)
}

export default handler
