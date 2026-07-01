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

/** Database verison of `Event`. The structure that lives in the database. */
export type DatabaseEvent = {
  id: number
  title: string
  startDate: number
  endDate: number
  relativeUrl: string
  location: string
  emojiName?: string
  recurring: number
  recursEvery?: string
}
