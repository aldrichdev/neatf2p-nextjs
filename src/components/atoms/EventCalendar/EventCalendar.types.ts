export type EventCalendarProps = {
  prop1: string
  prop2: string
}

export type Event = {
  id: number
  title: string
  start: Date
  end: Date
  /** Partial URL which the event is linked to */
  resource?: string
  /** Short, mobile-only description of where the event takes place */
  location?: string
}

/** Database verison of `Event`. The structure that lives in the database.
 * Properties need to be title case since the column names are.
 */
export type DatabaseEvent = {
  Id: number
  Title: string
  StartDate: Date
  EndDate: Date
  RelativeUrl: string
  Location: string
  EmojiName?: string
}
