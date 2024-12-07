import { NextApiRequest, NextApiResponse } from 'next'
import { queryDatabase } from '@helpers/db'
import { ErrorResult } from '@globalTypes/Database/ErrorResult'
import { DatabaseEvent, Event } from '@organisms/EventCalendar/EventCalendar.types'
import { getEmojiByName } from '@helpers/string/stringUtils'
import { getDateFromMillis } from '@helpers/date/date'

/** Handler for the getEvents API endpoint.*/
const handler = async (req: NextApiRequest, res: NextApiResponse<DatabaseEvent>) => {
  try {
    const list: Event[] = []
    const query = `SELECT e.Id, e.Title, e.StartDate, e.EndDate, e.RelativeUrl, e.Location, e.EmojiName
      FROM events e`

    const response: Array<DatabaseEvent> | ErrorResult = await queryDatabase('website', query)

    if (response instanceof Array) {
      // Map `DatabaseEvent` to `Event`.
      // (I made the DB column names different because I think RBC's property names suck.)
      response?.map((rowDataPacket: DatabaseEvent) => {
        const newObject: Event = {
          id: rowDataPacket.Id,
          title: rowDataPacket.EmojiName
            ? `${getEmojiByName(rowDataPacket.EmojiName)} ${rowDataPacket.Title}`
            : rowDataPacket.Title,
          start: getDateFromMillis(rowDataPacket.StartDate),
          end: getDateFromMillis(rowDataPacket.EndDate),
          resource: rowDataPacket.RelativeUrl,
          location: rowDataPacket.Location,
        }
        list.push(newObject)
      })

      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(list))
    } else {
      throw new Error(response.error?.toString())
    }
  } catch (error) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(error?.toString()))
  }
}

export default handler
