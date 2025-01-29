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

/** This is a list of NPC hiscore types for NPCs with different IDs but the same level
 * and name. Any NpcHiscoreTypes that are arrays MUST be here in order for type assertions
 * to function correctly. */
const ComplexHiscoreTypes = [
  [47, 177], // Rat (13)
  [4, 153, 154], // Goblin (13)
  [53, 80, 178], // Ghost
  [66, 189], // Black Knight
  [22, 181], // Lesser
  [62, 192], // Goblin (7) (+ Wormbrain)
  [232, 234], // Bandit (Black & Blue)
  [45, 179], // Skeleton (31) (reg + maze)
  [65, 100], // Guard (reg + fortress)
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
  ComplexHiscoreTypes[5],
  6,
  11,
  21,
  25,
  93,
  ComplexHiscoreTypes[0],
  ComplexHiscoreTypes[1],
  89,
  57,
  63,
  76,
  81,
  94,
  86,
  52,
  140,
  0,
  199,
  64,
  70,
  40,
  41,
  60,
  8,
  79,
  ComplexHiscoreTypes[2],
  37,
  46,
  188,
  159,
  137,
  ComplexHiscoreTypes[8],
  ComplexHiscoreTypes[6],
  139,
  ComplexHiscoreTypes[7],
  67,
  68,
  127,
  99,
  136,
  61,
  236,
  237,
  238,
  78,
  182,
  ComplexHiscoreTypes[3],
  195,
  102,
  158,
  190,
  104,
  135,
  ComplexHiscoreTypes[4],
  184,
] as const

export type HiscoreType = (typeof HiscoreTypes)[number]
export type NpcHiscoreType = (typeof NpcHiscoreTypes)[number]
