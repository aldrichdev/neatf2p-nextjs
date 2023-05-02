const nth = (d: number) => {
  if (d > 3 && d < 21) return 'th'
  switch (d % 10) {
    case 1:  return "st"
    case 2:  return "nd"
    case 3:  return "rd"
    default: return "th"
  }
}

export const getDateString = (date: Date) => {
  const month = date.toLocaleString('default', { month: 'long' });
  const dayInt = date.getDate()
  const day = `${dayInt}${nth(dayInt)}`
  const year = date.getFullYear()

  return `${month} ${day}, ${year}`
}
