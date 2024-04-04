import { NextApiRequest, NextApiResponse } from 'next'
import { queryDatabase, isOkPacket } from '@helpers/db'
import { NewsPost } from '@globalTypes/NewsPost'
import { OkPacket } from 'mysql'
import { ErrorResult } from '@globalTypes/Database/ErrorResult'
import { shouldBlockApiCall } from '@helpers/api/apiUtils'

const handler = async (req: NextApiRequest, res: NextApiResponse<NewsPost>) => {
  const { userId, image, alt, title, datePosted, body } = req.body
  const sessionCookie = req.cookies?.['neat-f2p-session']

  if (await shouldBlockApiCall(userId, sessionCookie)) {
    res.statusCode = 403
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify('Forbidden'))
    return
  }

  try {
    const insertImageQuery = `INSERT INTO images (image, alt) VALUES (?, ?)`
    const insertImageResponse: OkPacket | ErrorResult = await queryDatabase('website', insertImageQuery, [image, alt])
    const insertedImageId = isOkPacket(insertImageResponse) && insertImageResponse?.insertId

    // Next, build the insertNewsPost command and execute, then return results.
    const insertNewsPostQuery = `INSERT INTO newsPosts (image, title, datePosted, body) VALUES (?, ?, ?, ?)`
    const insertNewsPostResponse: OkPacket | ErrorResult = await queryDatabase('website', insertNewsPostQuery, [
      insertedImageId,
      title,
      datePosted,
      body,
    ])

    if (!isOkPacket(insertNewsPostResponse)) {
      throw new Error(insertNewsPostResponse?.error?.toString())
    }

    const insertedNewsPostId = insertNewsPostResponse?.insertId

    // Return a JSON result indicating success
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(`Success! Created news post with ID ${insertedNewsPostId}.`))
  } catch (error) {
    console.log('An error occurred in the submitNewsPost API: ', error)
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(`${error?.toString()}`))
  }
}

export default handler
