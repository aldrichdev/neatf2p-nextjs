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

// TODO: This function is not used in practice anywhere. Why is it still here?
export const getDateString = (date: Date) => {
  const month = date.toLocaleString('default', { month: 'long' })
  const dayInt = date.getDate()
  const day = `${dayInt}${nth(dayInt)}`
  const year = date.getFullYear()

  return `${month} ${day}, ${year}`
}

export const getTimeZoneAbbreviation = (date: Date) =>
  date.toLocaleTimeString('en-us', { timeZoneName: 'short' }).split(' ')[2]

export const getPrettyDateStringFromISOString = (dateString: string) => {
  const date = new Date(dateString)

  const month = date.toLocaleString('default', { month: 'long' })
  const dayInt = date.getDate()
  const day = `${dayInt}${nth(dayInt)}`
  const year = date.getFullYear()

  // Add time, not in military
  const hours = date.getHours() - 12
  const minutes = date.getMinutes()
  const period = date.getHours() >= 12 ? 'PM' : 'AM'

  return `${month} ${day}, ${year} ${hours}:${minutes} ${period}`
}

export const getDateFromMillis = (millis: number): Date => {
  // Open RSC framework's millis numbers are in 10 digit format. To get an accurate millis, we need to * by 1000.
  return new Date(millis * 1000)
}

export const getFullDateStringFromMillis = (millis: number): string => {
  // TODO: Reuse shared logic between here and `getPrettyDateStringFromISOString`
  // I think this file is out of date with main because the timezone is missing from the above method!
  const date = getDateFromMillis(millis)

  const month = date.toLocaleString('default', { month: 'long' })
  const dayInt = date.getDate()
  const day = `${dayInt}${nth(dayInt)}`
  const year = date.getFullYear()

  // Add time, not in military
  const hours = date.getHours() - 12
  const minutes = date.getMinutes()
  const period = date.getHours() >= 12 ? 'PM' : 'AM'

  // TODO apply minutes < 10 fix to other pretty date function
  return `${month} ${day}, ${year} ${hours}:${minutes < 10 ? '0' : ''}${minutes} ${period}`
}
