import { NextApiRequest, NextApiResponse } from 'next'
import { queryDatabase } from '@utils/db'
import { ErrorResult } from '@globalTypes/Database/ErrorResult'
import { DatabaseEvent } from '@globalTypes/event'
import { handleError } from '@utils/api/apiUtils'

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
      SELECT e.id, e.title, e.startDate, e.endDate, e.relativeUrl, e.location, e.emojiName, e.recurring, e.recursEvery
      FROM events e
      ${hasId ? `WHERE e.Id = ${Number(id)}` : ''}
    `

    const response: Array<DatabaseEvent> | ErrorResult = await queryDatabase('website', query)

    if (response instanceof Array) {
      response?.map((rowDataPacket: DatabaseEvent) => {
        // Return raw data from the database
        list.push(rowDataPacket)
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
