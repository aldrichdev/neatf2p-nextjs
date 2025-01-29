import { NpcHiscoreType } from './HiscoreType'

/** The fields in a player NPC hiscore table on their dedicated page. */
export type PlayerNpcHiscoreRow = {
  /** RSC NPC id. Used for linking back to the NPC hiscores.  */
  npcId: NpcHiscoreType
  npcName: string | undefined
  rank: number
  killCount: string
}
