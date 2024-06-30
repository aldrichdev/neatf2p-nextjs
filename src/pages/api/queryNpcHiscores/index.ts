import { NextApiRequest, NextApiResponse } from 'next'
import { User } from '@globalTypes/User'
import { handleQuery } from '@helpers/api/apiHandler'
import { PlayerHiscoreDataRow } from '@globalTypes/Database/PlayerHiscoreDataRow'

const handler = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  const query = `SELECT p.username, nk.npcID, nk.killCount FROM npckills nk
    JOIN players p ON nk.playerID = p.id
    WHERE p.banned = 0
    ORDER BY killCount DESC`

  return handleQuery<PlayerHiscoreDataRow>('game', query, res)
}

export default handler
