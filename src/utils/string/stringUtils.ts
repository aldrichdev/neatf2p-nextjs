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

/** Rounds a number to 2 decimal points and converts it to a string. */
export const convertNumberToTwoDecimalPoints = (number: number | undefined) => {
  if (number === undefined) {
    return ''
  }

  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return formatter.format(number)
}

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

export const isNilString = (input: string | undefined) => input === undefined || input === null || input.length < 1

/** Formats a RuneScape EXP amount to shorthand. e.g. 24,800,000 => 24.8M. */
export const formatExp = (exp: string | number): string => {
  const n = typeof exp === 'string' ? parseInt(exp.replace(/,/g, ''), 10) : exp
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return n.toString()
}
