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

export type HiscoreType = (typeof HiscoreTypes)[number]
