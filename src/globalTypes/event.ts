export type Event = {
  id: number
  title: string
  start: Date
  end: Date
  /** Partial URL which the event is linked to */
  resource?: string
  /** Short, mobile-only description of where the event takes place */
  location?: string
  /** Whether the event recurs */
  recurring: boolean
  recursEvery?: string
}

/** Database verison of `Event`. The structure that lives in the database.
 * Properties need to be title case since the column names are.
 *
 * (TODO: Really?? This looks stupid af, is there no other way?)
 */
export type DatabaseEvent = {
  Id: number
  Title: string
  StartDate: number
  EndDate: number
  RelativeUrl: string
  Location: string
  EmojiName?: string
  Recurring: number
  RecursEvery?: string
}
