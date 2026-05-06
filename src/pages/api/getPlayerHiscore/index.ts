import { NextApiRequest, NextApiResponse } from 'next'
import { handleQuery } from '@utils/api/apiHandler'
import { PlayerHiscoreDataRow } from '@globalTypes/Database/PlayerHiscoreDataRow'

const handler = async (req: NextApiRequest, res: NextApiResponse<PlayerHiscoreDataRow>) => {
  const { username } = JSON.parse(req.body)

  if (!username) {
    res.statusCode = 400
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify('Missing username provided to getPlayerHiscore.'))
    return
  }

  const query = `
    SELECT
      p.username,
      p.login_date,
      r.overallRank,
      p.skill_total,
      (e.attack + e.defense + e.strength + e.hits + e.ranged + e.prayer + e.magic + e.cooking + e.woodcut + e.fishing + e.firemaking + e.crafting + e.smithing + e.mining) AS totalXp,
      r.hitsRank,
      ms.hits,
      e.hits AS hitsxp,
      r.rangedRank,
      ms.ranged,
      e.ranged AS rangedxp,
      r.prayerRank,
      ms.prayer,
      e.prayer AS prayerxp,
      r.magicRank,
      ms.magic,
      e.magic AS magicxp,
      r.cookingRank,
      ms.cooking,
      e.cooking AS cookingxp,
      r.woodcutRank,
      ms.woodcut,
      e.woodcut AS woodcutxp,
      r.fishingRank,
      ms.fishing,
      e.fishing AS fishingxp,
      r.firemakingRank,
      ms.firemaking,
      e.firemaking AS firemakingxp,
      r.craftingRank,
      ms.crafting,
      e.crafting AS craftingxp,
      r.smithingRank,
      ms.smithing,
      e.smithing AS smithingxp,
      r.miningRank,
      ms.mining,
      e.mining AS miningxp
    FROM players p
    JOIN maxstats ms ON ms.playerID = p.id
    JOIN experience e ON e.playerID = p.id
    JOIN hiscore_ranks r ON r.playerID = p.id
    WHERE p.username = ?;
  `

  return handleQuery('game', query, res, [username])
}

export default handler
