import { NextApiRequest, NextApiResponse } from 'next'
import { handleQuery } from '@utils/api/apiHandler'
import { NpcHiscoreDataRow } from '@globalTypes/Database/NpcHiscoreDataRow'

const handler = async (req: NextApiRequest, res: NextApiResponse<NpcHiscoreDataRow>) => {
  const query = `SELECT p.username, nk.npcID, nk.killCount, p.login_date FROM npckills nk
    JOIN players p ON nk.playerID = p.id
    WHERE p.banned = 0
    ORDER BY killCount DESC`

  return handleQuery('game', query, res)
}

export default handler
