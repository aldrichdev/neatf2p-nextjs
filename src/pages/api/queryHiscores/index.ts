import { NextApiRequest, NextApiResponse } from 'next'
import { handleQuery } from '@utils/api/apiHandler'
import { PlayerHiscoreDataRow } from '@globalTypes/Database/PlayerHiscoreDataRow'

const handler = async (req: NextApiRequest, res: NextApiResponse<PlayerHiscoreDataRow>) => {
  const query = `SELECT
    p.username,
    p.skill_total,
    r.overallRank,
    r.hitsRank,
    r.rangedRank,
    r.prayerRank,
    r.magicRank,
    r.cookingRank,
    r.woodcutRank,
    r.fishingRank,
    r.firemakingRank,
    r.craftingRank,
    r.smithingRank,
    r.miningRank,
    (e.attack + e.defense + e.strength + e.hits + e.ranged + e.prayer + e.magic + e.cooking + e.woodcut + e.fishing + e.firemaking + e.crafting + e.smithing + e.mining) AS totalXp,
    ms.hits,
    e.hits AS hitsxp,
    ms.ranged,
    e.ranged AS rangedxp,
    ms.prayer,
    e.prayer AS prayerxp,
    ms.magic,
    e.magic AS magicxp,
    ms.cooking,
    e.cooking AS cookingxp,
    ms.woodcut,
    e.woodcut AS woodcutxp,
    ms.fishing,
    e.fishing AS fishingxp,
    ms.firemaking,
    e.firemaking AS firemakingxp,
    ms.crafting,
    e.crafting AS craftingxp,
    ms.smithing,
    e.smithing AS smithingxp,
    ms.mining,
    e.mining AS miningxp
    FROM maxstats ms
    JOIN players p ON p.id = ms.playerID
    JOIN experience e ON e.playerID = p.id
    JOIN hiscore_ranks r ON r.playerID = p.id
    WHERE p.group_id = 10
    AND p.banned = 0
  `

  return handleQuery('game', query, res)
}

export default handler
