const nth = (d: number) => {
  if (d > 3 && d < 21) return 'th'
  switch (d % 10) {
    case 1:
      return 'st'
    case 2:
      return 'nd'
    case 3:
      return 'rd'
    default:
      return 'th'
  }
}

export const getDateString = (date: Date) => {
  const month = date.toLocaleString('default', { month: 'long' })
  const dayInt = date.getDate()
  const day = `${dayInt}${nth(dayInt)}`
  const year = date.getFullYear()

  return `${month} ${day}, ${year}`
}

export const getPrettyDateStringFromISOString = (dateString: string) => {
  const date = new Date(dateString)

  const month = date.toLocaleString('default', { month: 'long' })
  const dayInt = date.getDate()
  const day = `${dayInt}${nth(dayInt)}`
  const year = date.getFullYear()

  // Add time, not in military
  const hours = date.getHours() <= 12 ? date.getHours() : date.getHours() - 12
  const minutes = date.getMinutes()
  const period = date.getHours() >= 12 ? 'PM' : 'AM'

  return `${month} ${day}, ${year} ${hours}:${minutes} ${period}`
}
