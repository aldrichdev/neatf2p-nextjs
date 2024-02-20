export const cleanInputString = (text: string) => {
  if (!text) return 'No input string'

  return text.replace(/'/g, "\\'")
}

/** Fixes passwords so RSC recognizes them, by replacing special characters with underscores. */
export const sanitizeRunescapePassword = (password: string) => password.replace(/[^A-Z0-9]/gi, '_')
