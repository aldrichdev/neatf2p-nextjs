import { NextApiRequest, NextApiResponse } from 'next'
import { User } from '@globalTypes/User'
import { handleQuery } from '@helpers/apiHandler'
import { HiscoreDataRow } from '@globalTypes/Database/HiscoreDataRow'

const handler = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  const query = `SELECT p.username, p.skill_total, cs.attack, e.attack AS 'attackxp', cs.defense, e.defense AS 'defensexp',
  cs.strength, e.strength AS 'strengthxp', cs.hits, e.hits AS 'hitsxp', cs.ranged, e.ranged AS 'rangedxp', cs.prayer,
  e.prayer AS 'prayerxp', cs.magic, e.magic AS 'magicxp', cs.cooking, e.cooking AS 'cookingxp', cs.woodcut,
  e.woodcut AS 'woodcutxp', cs.fishing, e.fishing AS 'fishingxp', cs.firemaking, e.firemaking AS 'firemakingxp', cs.crafting,
  e.crafting AS 'craftingxp', cs.smithing, e.smithing AS 'smithingxp', cs.mining,
  e.mining AS 'miningxp' FROM maxstats cs JOIN players p ON p.id = cs.playerID
  JOIN experience e ON e.playerID = p.id WHERE p.group_id != 0`

  return handleQuery<HiscoreDataRow>('game', query, res)
}

export default handler
