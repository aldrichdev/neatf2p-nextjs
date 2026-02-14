import { NextApiRequest, NextApiResponse } from 'next'
import { queryDatabase, isOkPacket } from '@helpers/db'
import { OkPacket } from 'mysql'
import { ErrorResult } from '@globalTypes/Database/ErrorResult'
import { shouldBlockApiCall } from '@helpers/api/apiUtils'
import { WebsiteEvent } from '@molecules/EventForm/EventForm.types'

const handler = async (req: NextApiRequest, res: NextApiResponse<WebsiteEvent>) => {
  const { userId, id, title, startDate, endDate, relativeUrl, location, emojiName, recurring, recursEvery } = req.body
  const sessionCookie = req.cookies?.['neat-f2p-session']

  if (await shouldBlockApiCall(userId, sessionCookie)) {
    res.statusCode = 403
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify('Forbidden'))
    return
  }

  try {
    if (id) {
      // Update existing event
      const updateEventQuery =
        'UPDATE events SET Title = ?, StartDate = ?, EndDate = ?, RelativeUrl = ?, Location = ?, EmojiName = ?, Recurring = ?, RecursEvery = ? WHERE Id = ? AND (SELECT COUNT(*) FROM users WHERE id = ? AND isAdmin = 1) > 0 LIMIT 1'
      const updateEventResponse: OkPacket | ErrorResult = await queryDatabase('website', updateEventQuery, [
        title,
        startDate,
        endDate,
        relativeUrl,
        location,
        emojiName,
        recurring,
        recursEvery,
        userId,
        id,
      ])

      if (!isOkPacket(updateEventResponse)) {
        throw new Error(updateEventResponse?.error?.toString())
      }

      if (updateEventResponse?.affectedRows < 1) {
        // Probably the user is not an admin...
        throw new Error('Unauthorized')
      }

      // Return a JSON result indicating success
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(`Success! Updated event with ID ${id}.`))
    } else {
      // Insert new event
      const insertEventQuery =
        'INSERT INTO events (Title, StartDate, EndDate, RelativeUrl, Location, EmojiName, Recurring, RecursEvery) SELECT ?, ?, ?, ?, ?, ?, ?, ? FROM events WHERE (SELECT COUNT(*) FROM users WHERE id = ? AND isAdmin = 1) > 0 LIMIT 1'
      const insertEventResponse: OkPacket | ErrorResult = await queryDatabase('website', insertEventQuery, [
        title,
        startDate,
        endDate,
        relativeUrl,
        location,
        emojiName,
        recurring,
        recursEvery,
        userId,
      ])

      if (!isOkPacket(insertEventResponse)) {
        throw new Error(insertEventResponse?.error?.toString())
      }

      if (insertEventResponse?.affectedRows < 1) {
        // Probably the user is not an admin...
        throw new Error('Unauthorized')
      }

      const insertedEventId = insertEventResponse?.insertId

      // Return a JSON result indicating success
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(`Success! Created event with ID ${insertedEventId}.`))
    }
  } catch (error) {
    console.log('An error occurred in the createNewsPost API: ', error)
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(`${error?.toString()}`))
  }
}

export default handler
