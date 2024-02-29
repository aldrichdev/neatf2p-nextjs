import { HiscoreDataRow } from '@globalTypes/Database/HiscoreDataRow'
import { HiscoresSortField } from '@globalTypes/Database/HiscoresSortField'
import { HiscoreType } from '@globalTypes/Hiscores/HiscoreType'

export const getTotalExp = (hiscoreRow: HiscoreDataRow) =>
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

export const isNotBaselineExp = (hiscore: HiscoreDataRow, propName: string) => {
  if (propName === 'skill_total') {
    return getTotalExp(hiscore) > 4000
  } else if (propName === 'hitsxp') {
    return hiscore.hitsxp > 4000
  } else {
    return hiscore[propName as keyof HiscoresSortField] > 0
  }
}

export const compareHiscores = (hiscoreType: HiscoreType, playerOne: HiscoreDataRow, playerTwo: HiscoreDataRow) => {
  type HiscoreSortKey = keyof HiscoresSortField
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

  return 0
}
