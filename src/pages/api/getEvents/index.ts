import { NextApiRequest, NextApiResponse } from 'next'
import { queryDatabase } from '@helpers/db'
import { ErrorResult } from '@globalTypes/Database/ErrorResult'
import { DatabaseEvent, Event } from '@organisms/EventCalendar/EventCalendar.types'
import { getEmojiByName } from '@helpers/string/stringUtils'
import { getDateFromMillis } from '@helpers/date/date'

/** Handler for the getEvents API endpoint.
 * Query Options:
 * `?id=n` - returns a single news post (in an array) by its unique ID
 */
const handler = async (req: NextApiRequest, res: NextApiResponse<DatabaseEvent>) => {
  try {
    const id = req?.query?.id
    const hasId = id && typeof id === 'string' && !isNaN(Number(id))

    const list: DatabaseEvent[] = []
    const query = `
      SELECT e.Id, e.Title, e.StartDate, e.EndDate, e.RelativeUrl, e.Location, e.EmojiName, e.Recurring, e.RecursEvery
      FROM events e
      ${hasId ? `WHERE e.Id = ${Number(id)}` : ''}
    `

    const response: Array<DatabaseEvent> | ErrorResult = await queryDatabase('website', query)

    if (response instanceof Array) {
      // Map `DatabaseEvent` to `Event`.
      response?.map((rowDataPacket: DatabaseEvent) => {
        // No! An API should return raw data from the database.
        // Do your model mapping somewhere else where receivers of it care.
        list.push(rowDataPacket)

        // const newObject: Event = {
        //   id: rowDataPacket.Id,
        //   title: rowDataPacket.EmojiName
        //     ? `${getEmojiByName(rowDataPacket.EmojiName)} ${rowDataPacket.Title}`
        //     : rowDataPacket.Title,
        //   start: getDateFromMillis(rowDataPacket.StartDate),
        //   end: getDateFromMillis(rowDataPacket.EndDate),
        //   resource: rowDataPacket.RelativeUrl,
        //   location: rowDataPacket.Location,
        //   recurring: rowDataPacket.Recurring === 1 ? true : false,
        //   recursEvery: rowDataPacket.RecursEvery,
        // }
        //list.push(newObject)
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
