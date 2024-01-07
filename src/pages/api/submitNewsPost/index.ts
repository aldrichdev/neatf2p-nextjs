import { NextApiRequest, NextApiResponse } from 'next'
import { queryDatabase, isOkPacket } from '@helpers/db'
import { NewsPost } from '@globalTypes/NewsPost'
import { OkPacket } from 'mysql'
import { cleanInputString } from '@helpers/string/stringUtils'
import { ErrorResult } from '@globalTypes/Database/ErrorResult'

const handler = async (req: NextApiRequest, res: NextApiResponse<NewsPost>) => {
  try {
    const insertImageQuery = `INSERT INTO images (image, alt) VALUES ('${req.body?.image}', '${cleanInputString(
      req.body?.alt,
    )}')`
    const insertImageResponse: OkPacket | ErrorResult = await queryDatabase('website', insertImageQuery)
    const insertedImageId = isOkPacket(insertImageResponse) && insertImageResponse?.insertId

    // Next, build the insertNewsPost command and execute, then return results.
    const insertNewsPostQuery = `INSERT INTO newsPosts (image, title, datePosted, body) VALUES (${insertedImageId}, 
      '${cleanInputString(req.body?.title)}', '${req.body?.datePosted}', '${cleanInputString(req.body?.body)}')`
    const insertNewsPostResponse: OkPacket | ErrorResult = await queryDatabase('website', insertNewsPostQuery)

    if (!isOkPacket(insertNewsPostResponse)) {
      throw new Error(insertNewsPostResponse?.error?.toString())
    }

    const insertedNewsPostId = insertNewsPostResponse?.insertId

    // Return a JSON result indicating success
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(`SUCCESS: Created news post with ID ${insertedNewsPostId}!`))
  } catch (error) {
    console.log('An error occurred in the submitNewsPost API: ', error)
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(`${error?.toString()}`))
  }
}

export default handler
