import { NpcHiscoreDataRow } from '@globalTypes/Database/NpcHiscoreDataRow'
import { PlayerHiscoreDataRow } from '@globalTypes/Database/PlayerHiscoreDataRow'
import { PlayerHiscoresSortField } from '@globalTypes/Database/PlayerHiscoresSortField'
import { HiscoreType, NpcHiscoreType } from '@globalTypes/Hiscores/HiscoreType'

export const getTotalExp = (hiscoreRow: PlayerHiscoreDataRow) =>
  hiscoreRow.attackxp +
  hiscoreRow.defensexp +
  hiscoreRow.strengthxp +
  hiscoreRow.hitsxp +
  hiscoreRow.rangedxp +
  hiscoreRow.prayerxp +
  hiscoreRow.magicxp +
  hiscoreRow.cookingxp +
  hiscoreRow.woodcutxp +
  hiscoreRow.fishingxp +
  hiscoreRow.firemakingxp +
  hiscoreRow.craftingxp +
  hiscoreRow.smithingxp +
  hiscoreRow.miningxp

export const convertExp = (skillXP: number) => {
  // Open RSC Core Framework experience numbers are 4 times what the actual RS exp number is.
  return Math.round(skillXP / 4).toLocaleString()
}

export const isNotBaselineExp = (hiscore: PlayerHiscoreDataRow, propName: string) => {
  if (propName === 'skill_total') {
    return getTotalExp(hiscore) > 4000
  } else if (propName === 'hitsxp') {
    return hiscore.hitsxp > 4000
  } else {
    return hiscore[propName as keyof PlayerHiscoresSortField] > 0
  }
}

export const compareHiscores = (
  hiscoreType: HiscoreType,
  playerOne: PlayerHiscoreDataRow,
  playerTwo: PlayerHiscoreDataRow,
) => {
  type HiscoreSortKey = keyof PlayerHiscoresSortField
  let fieldName: HiscoreSortKey

  switch (hiscoreType) {
    case 'Overall':
      fieldName = 'skill_total'
      break
    default:
      fieldName = `${hiscoreType.toLowerCase()}xp` as HiscoreSortKey
      break
  }

  if (playerOne[fieldName] > playerTwo[fieldName]) {
    return -1
  }

  if (playerOne[fieldName] < playerTwo[fieldName]) {
    return 1
  }

  if (playerOne[fieldName] === playerTwo[fieldName] && fieldName === 'skill_total') {
    // If this is Overall, we need to compare total EXP and give the tie breaker to the player with more EXP.
    if (getTotalExp(playerOne) > getTotalExp(playerTwo)) {
      return -1
    }

    if (getTotalExp(playerOne) < getTotalExp(playerTwo)) {
      return 1
    }
  }

  return 0
}

export const compareNpcHiscores = (
  npcHiscoreType: NpcHiscoreType,
  playerOne: NpcHiscoreDataRow,
  playerTwo: NpcHiscoreDataRow,
) => {
  const fieldName = 'killCount'

  if (playerOne[fieldName] > playerTwo[fieldName]) {
    return -1
  }

  if (playerOne[fieldName] < playerTwo[fieldName]) {
    return 1
  }

  return 0
}
