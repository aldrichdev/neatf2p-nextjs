import { NpcHiscoreDataRow } from '@globalTypes/Database/NpcHiscoreDataRow'
import { PlayerHiscoreDataRow } from '@globalTypes/Database/PlayerHiscoreDataRow'
import { PlayerHiscoresSortField } from '@globalTypes/Database/PlayerHiscoresSortField'
import { HiscoreType, NpcHiscoreType } from '@globalTypes/Hiscores/HiscoreType'
import { groupArrayByProperty } from '@helpers/arrayUtils'

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

/** Compares NPC hiscores by kill count. */
export const compareNpcHiscores = (playerOne: NpcHiscoreDataRow, playerTwo: NpcHiscoreDataRow) => {
  const fieldName = 'killCount'

  if (playerOne[fieldName] > playerTwo[fieldName]) {
    return -1
  }

  if (playerOne[fieldName] < playerTwo[fieldName]) {
    return 1
  }

  return 0
}

export const getNpcNameById = (id: NpcHiscoreType) => {
  const npcId = Array.isArray(id) ? id?.[0] : id

  switch (npcId) {
    case 3:
      return 'Chicken'
    case 5:
      return 'Hans'
    case 114:
      return 'Imp'
    case 62:
      return 'Goblin (7)'
    case 11:
      return 'Man'
    case 6:
      return 'Cow'
    case 21:
      return 'Mugger'
    case 47:
      return 'Rat (13)'
    case 93:
      return 'Monk'
    case 4:
      return 'Goblin (13)'
    case 57:
      return 'Dark Wizard (13)'
    case 76:
      return 'Barbarian'
    case 94:
      return 'Dwarf'
    case 199:
      return 'Dark Warrior'
    case 41:
      return 'Zombie (24)'
    case 60:
      return 'Dark Wizard (25)'
    case 67:
      return 'Hobgoblin'
    case 68:
      return 'Zombie (32)'
    case 99:
      return 'Deadly Red Spider'
    case 61:
      return 'Giant'
    case 104:
      return 'Moss Giant'
    case 78:
      return 'Gunthor the Brave'
    case 66:
      return 'Black Knight'
    case 195:
      return 'Skeleton (54)'
    case 102:
      return 'White Knight'
    case 158:
      return 'Ice Warrior'
    case 190:
      return 'Chaos Dwarf'
    case 135:
      return 'Ice Giant'
    case 22:
      return 'Lesser Demon'
    case 184:
      return 'Greater Demon'
  }
}

/** Groups NPC kill records for the same NPC by username and sums the kill counts.
 *  (When we query by multiple NPC IDs in an array, like level 13 goblins [4, 153, 154],
 *  we get some account names back in duplicate.)
 *  @param filteredHiscores - all NPC hiscores filtered by NPC hiscore type
 */
export const groupByUsername = (filteredHiscores: NpcHiscoreDataRow[]) => {
  const groupedHiscores = groupArrayByProperty(filteredHiscores, 'username')

  // Make a new array using the key (username) and the sum of all `killCount` properties in the object array
  const newArray: NpcHiscoreDataRow[] = []

  Object.entries(groupedHiscores).map((record: [key: string, value: NpcHiscoreDataRow[]]) => {
    const newObject: NpcHiscoreDataRow = {
      npcID: 0, // Shouldn't matter
      username: record?.[0],
      killCount: record?.[1]?.reduce((n, { killCount }) => n + killCount, 0),
    }
    newArray.push(newObject)
  })

  return newArray
}
