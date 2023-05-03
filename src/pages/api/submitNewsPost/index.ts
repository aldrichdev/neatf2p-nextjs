import fs from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'
import { insertIntoWebsiteDatabase } from '@lib/db'
import { NewsPost } from '@atoms/NewsAndUpdates'
import { OkPacket } from 'mysql'
import { cleanInputString } from '@lib/helpers/string/stringUtils'

const isOkPacket = (o: any): o is OkPacket => {
  return o && o.hasOwnProperty('insertId') && typeof o.insertId === 'number'
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<NewsPost>
) => {
  try {
    const insertImageStub = fs.readFileSync('src/sql/insertImage.sql').toString()
    const insertImageQuery = `${insertImageStub} ('${req.body?.image}', '${cleanInputString(req.body?.alt)}')`
    const insertImageResponse: OkPacket | { error: unknown } = await insertIntoWebsiteDatabase(insertImageQuery)
    
    const insertedImageId = isOkPacket(insertImageResponse) && insertImageResponse?.insertId

    // Next, build the insertNewsPost command and execute, then return results.
    const insertNewsPostStub = fs.readFileSync('src/sql/insertNewsPost.sql').toString()
    const insertNewsPostQuery = `${insertNewsPostStub} (${insertedImageId}, '${cleanInputString(req.body?.title)}',
      '${req.body?.datePosted}', '${cleanInputString(req.body?.body)}')`
    console.log('insertNewsPostQuery', insertNewsPostQuery)
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
