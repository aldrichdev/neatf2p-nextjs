export const HiscoreTypes = [
  'Overall',
  'Hits',
  'Ranged',
  'Prayer',
  'Magic',
  'Cooking',
  'Woodcut',
  'Fishing',
  'Firemaking',
  'Crafting',
  'Smithing',
  'Mining',
] as const

/** This is a list of NPC hiscore types for NPCs with different IDs but the same level and name */
const ComplexHiscoreTypes = [
  [47, 177], // Rat (13)
  [4, 153, 154], // Goblin (13)
  [53, 80, 178], // Ghost
  [66, 189], // Black Knight
  [22, 181], // Lesser
]

/** Note that this determines the order of the NPC names in the menu. */
export const NpcHiscoreTypes = [
  29,
  19,
  34,
  23,
  74,
  3,
  5,
  114,
  62,
  6,
  11,
  21,
  93,
  ComplexHiscoreTypes[0],
  ComplexHiscoreTypes[1],
  57,
  76,
  94,
  52,
  199,
  64,
  70,
  40,
  41,
  60,
  ComplexHiscoreTypes[2],
  46,
  137,
  45,
  179,
  67,
  68,
  127,
  99,
  136,
  61,
  78,
  ComplexHiscoreTypes[3],
  195,
  102,
  158,
  190,
  104,
  195,
  135,
  ComplexHiscoreTypes[4],
  184,
] as const

console.log('NpcHiscoreTypes', NpcHiscoreTypes)

export type HiscoreType = (typeof HiscoreTypes)[number]
export type NpcHiscoreType = (typeof NpcHiscoreTypes)[number]
