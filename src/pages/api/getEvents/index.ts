import { NextApiRequest, NextApiResponse } from 'next'
import { queryDatabase } from '@utils/db'
import { ErrorResult } from '@globalTypes/Database/ErrorResult'
import { DatabaseEvent, Event } from '@organisms/EventCalendar/EventCalendar.types'
import { getEmojiByName } from '@utils/string/stringUtils'
import { getDateFromMillis } from '@utils/date/date'
import { handleError } from '@utils/api/apiUtils'

/** Handler for the getEvents API endpoint.*/
const handler = async (req: NextApiRequest, res: NextApiResponse<DatabaseEvent>) => {
  try {
    const list: Event[] = []
    const query = `
      SELECT e.Id, e.Title, e.StartDate, e.EndDate, e.RelativeUrl, e.Location, e.EmojiName, e.Recurring, e.RecursEvery
      FROM events e
    `

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
          recurring: rowDataPacket.Recurring === 1 ? true : false,
          recursEvery: rowDataPacket.RecursEvery,
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
    handleError(res, error, 'getEvents')
  }
}

export default handler
