export const HiscoreTypes = [
  'Overall',
  'Attack',
  'Defense',
  'Strength',
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

// export type HiscoreType =
//   | 'Overall'
//   | 'Attack'
//   | 'Defense'
//   | 'Strength'
//   | 'Hits'
//   | 'Ranged'
//   | 'Prayer'
//   | 'Magic'
//   | 'Cooking'
//   | 'Woodcut'
//   | 'Fishing'
//   | 'Firemaking'
//   | 'Crafting'
//   | 'Smithing'
//   | 'Mining'
