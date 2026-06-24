import { NextApiRequest, NextApiResponse } from 'next'
import { queryDatabase, isOkPacket } from '@helpers/db'
import { OkPacket } from 'mysql'
import { ErrorResult } from '@globalTypes/Database/ErrorResult'
import { shouldBlockApiCall } from '@helpers/api/apiUtils'
import { DatabaseEvent } from '@globalTypes/event'

const handler = async (req: NextApiRequest, res: NextApiResponse<DatabaseEvent>) => {
  const { userId, id, title, startDate, endDate, relativeUrl, location, emojiName, recurring, recursEvery } = req.body
  console.log('event id', id)
  const sessionCookie = req.cookies?.['neat-f2p-session']

  if (await shouldBlockApiCall(userId, sessionCookie)) {
    res.statusCode = 403
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify('Forbidden'))
    return
  }

  console.log('Not forbidden.')

  try {
    if (id) {
      console.log('Update existing. user id = ', userId)
      // Update existing event
      // TODO: Why does the `SELECT COUNT(*) FROM users WHERE id = ? AND isAdmin = 1` part return 0?
      // Query this at home
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

      console.log('updateEvent worked')

      if (!isOkPacket(updateEventResponse)) {
        console.log('not ok packet')
        throw new Error(updateEventResponse?.error?.toString())
      }

      if (updateEventResponse?.affectedRows < 1) {
        console.log('0 affected rows')
        // Probably the user is not an admin...
        throw new Error('Unauthorized')
      }

      // Return a JSON result indicating success
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(`Success! Updated event with ID ${id}. Redirecting you to the Events page...`))
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
      res.end(
        JSON.stringify(`Success! Created event with ID ${insertedEventId}. Redirecting you to the Events page...`),
      )
    }
  } catch (error) {
    console.log('An error occurred in the upsertEvent API: ', error)
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(`${error?.toString()}`))
  }
}

export default handler
