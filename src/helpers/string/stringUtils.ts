export const cleanInputString = (text: string) => {
  if (!text) return 'No input string'

  return text.replace(/'/g, "\\'")
}

/** Checks if game account password string is valid.
 * For now, we only allow game account passwords with letters, numbers and underscores. */
export const gameAccountPasswordIsValid = (password: string) => {
  const validPasswordMatches = password.match(/^[a-zA-Z0-9_]+$/g)

  if (!validPasswordMatches || !validPasswordMatches?.[0]) {
    return false
  }

  return true
}
