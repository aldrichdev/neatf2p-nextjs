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

export const getTimeZoneAbbreviation = (date: Date) =>
  date.toLocaleTimeString('en-us', { timeZoneName: 'short' }).split(' ')[2]

export const isToday = (date: Date | string | number): boolean => {
  const d = new Date(date)
  const now = new Date()

  return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth() && d.getDate() === now.getDate()
}

export const getPrettyDateString = (date: Date, useToday?: boolean) => {
  const month = date.toLocaleString('default', { month: 'long' })
  const dayInt = date.getDate()
  const day = `${dayInt}${nth(dayInt)}`
  const year = date.getFullYear()

  // Add time, not in military
  const hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours()
  const minutes = date.getMinutes()
  const period = date.getHours() >= 12 ? 'PM' : 'AM'

  const isDateToday = isToday(date)
  const dayPart = `${isDateToday && useToday ? 'Today,' : `${month} ${day}, ${year}`}`
  const timePart = `${hours === 0 ? 12 : hours}:${minutes < 10 ? '0' : ''}${minutes} ${period}`

  return `${dayPart} ${timePart}`
}

export const getPrettyDateStringFromISOString = (dateString: string) => {
  const date = new Date(dateString)

  return getPrettyDateString(date)
}

export const getDateFromMillis = (millis: number): Date => {
  // Open RSC framework's millis numbers are in 10 digit format. To get an accurate millis, we need to * by 1000.
  return new Date(millis * 1000)
}

export const getPrettyDateStringFromMillis = (millis: number, useToday?: boolean): string => {
  const date = getDateFromMillis(millis)

  return getPrettyDateString(date, useToday)
}
