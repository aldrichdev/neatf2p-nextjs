export const cleanInputString = (text: string) => {
  if (!text) return 'No input string'

  return text.replace(/'/g, "\\'")
}
