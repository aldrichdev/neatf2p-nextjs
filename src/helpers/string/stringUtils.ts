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
