import { NextApiRequest, NextApiResponse } from 'next'
import { queryDatabase } from '@helpers/db'
import { ErrorResult } from '@globalTypes/Database/ErrorResult'
import { DatabaseEvent, Event } from '@atoms/EventCalendar/EventCalendar.types'
import { getEmojiByName } from '@helpers/string/stringUtils'

/** Handler for the getEvents API endpoint.
 * Query Options:
 * `?id=n` - returns a single event (in an array) by its unique ID
 */
const handler = async (req: NextApiRequest, res: NextApiResponse<DatabaseEvent>) => {
  // TODO: How do we prevent people from running this via Postman or cURL or whatever and creating events they choose?
  try {
    const list: Event[] = []
    const id = req?.query?.id
    const hasId = id && typeof id === 'string' && !isNaN(Number(id))
    const query = `SELECT e.Id, e.Title, e.StartDate, e.EndDate, e.RelativeUrl, e.Location, e.EmojiName
      FROM events e
      ${hasId ? `WHERE e.Id = ${Number(id)}` : ''}`

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
          start: new Date(rowDataPacket.StartDate),
          end: new Date(rowDataPacket.EndDate),
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
