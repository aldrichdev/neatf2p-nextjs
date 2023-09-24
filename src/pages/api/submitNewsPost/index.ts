import { NextApiRequest, NextApiResponse } from 'next'
import { insertIntoWebsiteDatabase, isOkPacket } from '@helpers/db'
import { NewsPost } from 'src/globalTypes/NewsPost'
import { OkPacket } from 'mysql'
import { cleanInputString } from '@helpers/string/stringUtils'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<NewsPost>
) => {
  try {
    const insertImageStub = `INSERT INTO images (image, alt) VALUES `
    const insertImageQuery = `${insertImageStub} ('${req.body?.image}', '${cleanInputString(req.body?.alt)}')`
    const insertImageResponse: OkPacket | { error: unknown } = await insertIntoWebsiteDatabase(insertImageQuery)
    const insertedImageId = isOkPacket(insertImageResponse) && insertImageResponse?.insertId

    // Next, build the insertNewsPost command and execute, then return results.
    const insertNewsPostStub = `INSERT INTO newsPosts (image, title, datePosted, body) VALUES `
    const insertNewsPostQuery = `${insertNewsPostStub} (${insertedImageId}, '${cleanInputString(req.body?.title)}',
      '${req.body?.datePosted}', '${cleanInputString(req.body?.body)}')`
    const insertNewsPostResponse: OkPacket | { error: unknown } = await insertIntoWebsiteDatabase(insertNewsPostQuery)

    if (!isOkPacket(insertNewsPostResponse)) {
      throw new Error(insertNewsPostResponse?.error?.toString())
    }

    const insertedNewsPostId = insertNewsPostResponse?.insertId

    // Return a JSON result indicating success
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(`SUCCESS: Created news post with ID ${insertedNewsPostId}!`))
  }
  catch (error) {
    console.log('error', error)
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(`${error?.toString()}`))
  }
}

export default handler
