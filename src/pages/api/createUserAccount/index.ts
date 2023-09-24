import { NextApiRequest, NextApiResponse } from 'next'
import { insertIntoWebsiteDatabase, isOkPacket } from '@helpers/db'
import { NewsPost } from 'src/globalTypes/NewsPost'
import { OkPacket } from 'mysql'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<NewsPost>
) => {
  try {
    const insertUserQuery = `INSERT INTO users (emailAddress, username, password, passwordSalt, lastLogin, isAdmin, dateCreated)
      VALUES ('${req.body?.email}', '${req.body?.username}', '${req.body?.password}', '${req.body?.passwordSalt}',
      '${req.body?.currentDate}', '0', '${req?.body?.currentDate}')`

    const insertUserResponse: OkPacket | { error: unknown } = await insertIntoWebsiteDatabase(insertUserQuery)

    if (!isOkPacket(insertUserResponse)) {
      throw new Error(insertUserResponse?.error?.toString())
    }

    const newUserId = insertUserResponse?.insertId

    // Return a JSON result indicating success
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(newUserId))
  }
  catch (error) {
    console.log('error', error)
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(`${error?.toString()}`))
  }
}

export default handler
