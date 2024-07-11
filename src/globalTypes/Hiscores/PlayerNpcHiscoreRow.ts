/** The fields in a player NPC hiscore table on their dedicated page. */
export type PlayerNpcHiscoreRow = {
  /** RSC NPC id. Used for linking back to the NPC hiscores.  */
  npcId: number | readonly number[]
  npcName: string | undefined
  rank: number | string
  killCount: string
}
