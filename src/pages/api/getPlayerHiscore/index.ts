import { NextApiRequest, NextApiResponse } from 'next'
import { User } from '@globalTypes/User'
import { handleQuery } from '@helpers/api/apiHandler'
import { PlayerHiscoreDataRow } from '@globalTypes/Database/PlayerHiscoreDataRow'

const handler = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  const { username } = req.body

  if (!username) {
    res.statusCode = 400
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify('Missing username provided to getPlayerHiscore.'))
    return
  }

  const query = `SELECT p.username, p.login_date, p.skill_total, e.attack AS 'attackxp', e.defense AS 'defensexp', 
    e.strength AS 'strengthxp', ms.hits, e.hits AS 'hitsxp', ms.ranged, e.ranged AS 'rangedxp', ms.prayer, 
    e.prayer AS 'prayerxp', ms.magic, e.magic AS 'magicxp', ms.cooking, e.cooking AS 'cookingxp', ms.woodcut, 
    e.woodcut AS 'woodcutxp', ms.fishing, e.fishing AS 'fishingxp', ms.firemaking, e.firemaking AS 'firemakingxp', 
    ms.crafting, e.crafting AS 'craftingxp', ms.smithing, e.smithing AS 'smithingxp', ms.mining, e.mining AS 'miningxp' 
    FROM maxstats ms
    JOIN players p ON p.id = ms.playerID JOIN experience e ON e.playerID = p.id WHERE p.group_id = 10 AND p.banned = 0`

  return handleQuery<PlayerHiscoreDataRow>('game', query, res)
}

export default handler
