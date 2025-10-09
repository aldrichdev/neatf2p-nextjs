import { NextApiRequest, NextApiResponse } from 'next'
import { queryDatabase, isOkPacket } from '@helpers/db'
import { NewsPost } from '@globalTypes/NewsPost'
import { OkPacket } from 'mysql'
import { ErrorResult } from '@globalTypes/Database/ErrorResult'
import { shouldBlockApiCall } from '@helpers/api/apiUtils'

const handler = async (req: NextApiRequest, res: NextApiResponse<NewsPost>) => {
  const { userId, newsPostId, imageId, image, alt, title, body, bodyInput } = req.body
  const sessionCookie = req.cookies?.['neat-f2p-session']

  if (await shouldBlockApiCall(userId, sessionCookie)) {
    res.statusCode = 403
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify('Forbidden'))
    return
  }

  try {
    let updateImageResponse: OkPacket | ErrorResult | null = null

    // Only update the image record if there is actually an image to update
    if (image && imageId) {
      const updateImageQuery = `UPDATE images SET image = ?, alt = ? WHERE id = ? AND (SELECT COUNT(*) FROM users WHERE id = ? AND isAdmin = 1) > 0 LIMIT 1`
      updateImageResponse = await queryDatabase('website', updateImageQuery, [image, alt, imageId, userId])
    }

    if (updateImageResponse && !isOkPacket(updateImageResponse)) {
      throw new Error(updateImageResponse?.error?.toString())
    }

    if (updateImageResponse?.affectedRows && updateImageResponse.affectedRows < 1) {
      // Probably the user is not an admin...
      throw new Error('Unauthorized')
    }

    const updateNewsPostQuery = `UPDATE newsPosts SET title = ?, body = ?, bodyInput = ? WHERE id = ? AND (SELECT COUNT(*) FROM users WHERE id = ? AND isAdmin = 1) > 0 LIMIT 1`
    const updateNewsPostResponse: OkPacket | ErrorResult = await queryDatabase('website', updateNewsPostQuery, [
      title,
      body,
      bodyInput,
      newsPostId,
      userId,
    ])

    if (!isOkPacket(updateNewsPostResponse)) {
      throw new Error(updateNewsPostResponse?.error?.toString())
    }

    if (updateNewsPostResponse?.affectedRows < 1) {
      // Either the user is not an admin, or the news post ID does not exist.
      throw new Error('Unauthorized or Invalid News Post ID')
    }

    // Return a JSON result indicating success
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(`Success! Updated news post with ID ${newsPostId}.`))
  } catch (error) {
    console.log('An error occurred in the updateNewsPost API: ', error)
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(`${error?.toString()}`))
  }
}

export default handler
