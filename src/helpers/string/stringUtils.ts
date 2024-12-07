/** Fixes passwords so RSC recognizes them, by replacing special characters with underscores. */
export const sanitizeRunescapePassword = (password: string) => password.replace(/[^A-Z0-9]/gi, '_')

/** Generates a random 64-long alpha-numeric string. */
export const GetRandomToken = () => {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''

  for (let i = 0; i < 64; i++) result += charset[Math.floor(Math.random() * charset.length)]

  return result
}

export const pluralize = (number: number, text: string) => (number === 1 ? text : `${text}s`)

/** Rounds a number to 1 decimal point and converts it to a string. */
export const convertNumberToOneDecimalPoint = (number: number) => (Math.round(number * 10) / 10).toFixed(1).toString()

/** Converts an emoji name in the website database to an emoji.
 * MySQL can't return all emoji correctly and converts some to ? symbols.
 */
export const getEmojiByName = (emojiName: string) => {
  switch (emojiName) {
    case 'Crown':
      return '👑'
    case 'Pumpkin':
      return '🎃'
    default:
      return 'ℹ'
  }
}
