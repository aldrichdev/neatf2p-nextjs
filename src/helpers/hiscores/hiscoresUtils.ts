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

/** Gets NPC name for headings and other uses of the real NPC name. */
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
    case 192:
    case 4:
      return 'Goblin'
    case 11:
      return 'Man'
    case 6:
      return 'Cow'
    case 21:
      return 'Mugger'
    case 25:
      return 'Jonny the Beard'
    case 29:
    case 19:
    case 47:
      return 'Rat'
    case 34:
    case 23:
    case 74:
      return 'Spider'
    case 93:
      return 'Monk'
    case 57:
    case 60:
      return 'Dark Wizard'
    case 89:
      return 'Highwayman'
    case 63:
      return 'Farmer'
    case 76:
      return 'Barbarian'
    case 81:
      return 'Wizard'
    case 94:
      return 'Dwarf'
    case 86:
    case 159:
      return 'Warrior'
    case 52:
    case 41:
    case 68:
      return 'Zombie'
    case 140:
    case 139:
      return 'Monk of Zamorak'
    case 0:
      return 'Unicorn'
    case 199:
      return 'Dark Warrior'
    case 64:
      return 'Thief'
    case 70:
      return 'Scorpion'
    case 8:
    case 188:
      return 'Bear'
    case 79:
      return 'Witch'
    case 53:
      return 'Ghost'
    case 37:
      return 'Weapons Master'
    case 137:
      return 'Pirate'
    case 65:
    case 100:
      return 'Guard'
    case 232:
    case 234:
      return 'Bandit'
    case 67:
      return 'Hobgoblin'
    case 127:
      return 'Jailguard'
    case 99:
      return 'Deadly Red Spider'
    case 136:
      return 'King Scorpion'
    case 61:
      return 'Giant'
    case 236:
      return 'Donny the Lad'
    case 237:
      return 'Black Heather'
    case 238:
      return 'Speedy Keith'
    case 104:
      return 'Moss Giant'
    case 78:
      return 'Gunthor the Brave'
    case 182:
      return 'Melzar the Mad'
    case 66:
      return 'Black Knight'
    case 40:
    case 46:
    case 45:
    case 179:
    case 195:
      return 'Skeleton'
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

/** Gets NPC name for the sidebar - e.g. it can't render "Zombie" for ID 41 or 68,
 * only the first NPC ID for that array (which would be 52 in case of Zom) */
export const getNpcNameByIdForMenu = (id: NpcHiscoreType) => {
  const npcId = Array.isArray(id) ? id?.[0] : id

  switch (npcId) {
    case 29:
      return 'Rat'
    case 34:
      return 'Spider'
    case 3:
      return 'Chicken'
    case 5:
      return 'Hans'
    case 114:
      return 'Imp'
    case 62:
      return 'Goblin'
    case 11:
      return 'Man'
    case 6:
      return 'Cow'
    case 21:
      return 'Mugger'
    case 25:
      return 'Jonny the Beard'
    case 93:
      return 'Monk'
    case 57:
      return 'Dark Wizard'
    case 89:
      return 'Highwayman'
    case 63:
      return 'Farmer'
    case 76:
      return 'Barbarian'
    case 81:
      return 'Wizard'
    case 94:
      return 'Dwarf'
    case 86:
      return 'Warrior'
    case 52:
      return 'Zombie'
    case 140:
      return 'Monk of Zamorak'
    case 0:
      return 'Unicorn'
    case 199:
      return 'Dark Warrior'
    case 64:
      return 'Thief'
    case 70:
      return 'Scorpion'
    case 40:
      return 'Skeleton'
    case 8:
      return 'Bear'
    case 79:
      return 'Witch'
    case 53:
      return 'Ghost'
    case 37:
      return 'Weapons Master'
    case 137:
      return 'Pirate'
    case 65:
      return 'Guard'
    case 232:
      return 'Bandit'
    case 67:
      return 'Hobgoblin'
    case 127:
      return 'Jailguard'
    case 99:
      return 'Deadly Red Spider'
    case 136:
      return 'King Scorpion'
    case 61:
      return 'Giant'
    case 236:
      return 'Donny the Lad'
    case 237:
      return 'Black Heather'
    case 238:
      return 'Speedy Keith'
    case 104:
      return 'Moss Giant'
    case 78:
      return 'Gunthor the Brave'
    case 182:
      return 'Melzar the Mad'
    case 66:
      return 'Black Knight'
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

/** TODO: Find a way to reduce repetitiveness across these 3 functions which all need 
 * to behave differently. Maybe a simple getNpcNameById function to share simple use cases
 * across the 3.
 * 
 * this is retarded, but im drunk, just go with it for the moment
 * basically we have 3 ways taht we get npc names:
 * 1. Getting it as the real npc name, i.e. for a heading, or just to "get the f'ing name plz" kind of thing
 * 2. Getting it for the menu item - what we show in the sidebar - it can't render "Zombie" for ID 41 or 68!
 * 3. Getting it for the menu KEY - this needs to be UNIQUE (that's this method)
 * OHHHH so basically because we have values in NpcHiscoreTypes like 41 (level 24 zombie),
   those come through as undefined when we use getNpcNameByIdForMenu because it ain't there,
   and it shouldn't be. And because there are multiple "undefined"s, keys are not unique.
 */
export const getNpcNameByIdForMenuKey = (id: NpcHiscoreType) => {
  const npcId = Array.isArray(id) ? id?.[0] : id

  switch (npcId) {
    case 29:
      return 'Rat (2)'
    case 19:
      return 'Rat (8)'
    case 47:
      return 'Rat (13)'
    case 34:
      return 'Spider (2)'
    case 23:
      return 'Spider (8)'
    case 74:
      return 'Spider (31)'
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
    case 25:
      return 'Jonny the Beard'
    case 93:
      return 'Monk'
    case 4:
      return 'Goblin (13)'
    case 57:
      return 'Dark Wizard (13)'
    case 89:
      return 'Highwayman'
    case 63:
      return 'Farmer'
    case 76:
      return 'Barbarian'
    case 81:
      return 'Wizard'
    case 94:
      return 'Dwarf'
    case 86:
      return 'Warrior (18)'
    case 159:
      return 'Warrior (27)'
    case 52:
      return 'Zombie (19)'
    case 41:
      return 'Zombie (24)'
    case 68:
      return 'Zombie (32)'
    case 140:
      return 'Monk of Zamorak (19)'
    case 139:
      return 'Monk of Zamorak (29)'
    case 0:
      return 'Unicorn'
    case 199:
      return 'Dark Warrior'
    case 64:
      return 'Thief'
    case 70:
      return 'Scorpion'
    case 8:
      return 'Bear (24)'
    case 60:
      return 'Dark Wizard (25)'
    case 79:
      return 'Witch'
    case 53:
      return 'Ghost'
    case 37:
      return 'Weapons Master'
    case 188:
      return 'Bear (26)'
    case 137:
      return 'Pirate'
    case 65:
      return 'Guard'
    case 100:
      return 'Guard (Fortress)'
    case 232:
      return 'Bandit (Black)'
    case 234:
      return 'Bandit (Blue)'
    case 236:
      return 'Donny the Lad'
    case 237:
      return 'Black Heather'
    case 238:
      return 'Speedy Keith'
    case 67:
      return 'Hobgoblin'
    case 127:
      return 'Jailguard'
    case 99:
      return 'Deadly Red Spider'
    case 136:
      return 'King Scorpion'
    case 61:
      return 'Giant'
    case 104:
      return 'Moss Giant'
    case 78:
      return 'Gunthor the Brave'
    case 182:
      return 'Melzar the Mad'
    case 66:
      return 'Black Knight'
    case 40:
      return 'Skeleton (21)'
    case 46:
      return 'Skeleton (25)'
    case 45:
      return 'Skeleton (31)'
    case 179:
      return 'Skeleton (31) (Maze)'
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

/** Given an NPC ID, returns the combat level for that NPC as a number. */
export const getNpcCombatLevelById = (id: number) => {
  switch (id) {
    case 29:
    case 34:
      return 2
    case 3:
    case 5:
      return 3
    case 114:
      return 5
    case 62:
    case 192:
      return 7
    case 11:
      return 9
    case 6:
    case 23:
    case 19:
      return 8
    case 21:
    case 25:
      return 10
    case 47:
    case 93:
    case 4:
    case 153:
    case 154:
    case 57:
    case 177:
    case 89:
      return 13
    case 63:
      return 15
    case 76:
    case 81:
      return 16
    case 94:
    case 86:
      return 18
    case 52:
    case 140:
      return 19
    case 199:
    case 64:
    case 70:
    case 40:
    case 0:
      return 21
    case 41:
    case 8:
      return 24
    case 60:
    case 53:
    case 80:
    case 178:
    case 46:
    case 37:
    case 79:
      return 25
    case 188:
      return 26
    case 137:
    case 159:
      return 27
    case 65:
    case 100:
      return 28
    case 139:
    case 232:
    case 234:
      return 29
    case 74:
    case 45:
    case 179:
      return 31
    case 67:
    case 68:
      return 32
    case 127:
      return 34
    case 99:
    case 136:
      return 36
    case 61:
    case 78:
      return 37
    case 236:
    case 237:
    case 238:
      return 39
    case 182:
      return 45
    case 66:
    case 189:
      return 46
    case 195:
      return 54
    case 102:
      return 56
    case 158:
      return 57
    case 190:
      return 59
    case 104:
      return 62
    case 135:
      return 68
    case 22:
    case 181:
      return 79
    case 184:
      return 87
  }
}

/** This should return an array of npc IDs for any NPC that we want
 *  to show a subnav for. Examples: Rats, Spiders, Zombies, Skeletons.
 *
 *  We DON'T want to add NPC IDs here if they are all the same level -
 *  for example, level 25 Ghost have 3 IDs but they are all the same
 *  level, so we want to sum the kills, not show a tab menu. */
export const getNpcIdsByInitialId = (id: number | string): Array<number | number[]> => {
  switch (id) {
    case 29:
    case 19:
    case '47,177':
      return [29, 19, [47, 177]] // Rat
    case '62,192':
    case '4,153,154':
      return [
        [62, 192],
        [4, 153, 154],
      ] // Goblin
    case 34:
    case 23:
    case 74:
      return [34, 23, 74] // Spider
    case 57:
    case 60:
      return [57, 60] // Dark Wizard
    case 41:
    case 52:
    case 68:
      return [52, 41, 68] // Zombie
    case 40:
    case 46:
    case '45,179':
    case 195:
      return [40, 46, [45, 179], 195] // Skeleton
    case 86:
    case 159:
      return [86, 159] // Warrior
    case 140:
    case 139:
      return [140, 139] // Monk of Zamorak
    case 8:
    case 188:
      return [8, 188] // Bear
    default:
      return []
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
