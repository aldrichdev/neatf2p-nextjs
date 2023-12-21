import { NextApiRequest, NextApiResponse } from 'next'
import { manipulateWebsiteData, isOkPacket } from '@helpers/db'
import { NewsPost } from '@globalTypes/NewsPost'
import { OkPacket } from 'mysql'
import { ErrorResult } from '@globalTypes/Database/ErrorResult'

const handler = async (req: NextApiRequest, res: NextApiResponse<NewsPost>) => {
  // Generate GUID

  const insertUserQuery = `INSERT INTO users (emailAddress, username, password, passwordSalt, lastLogin, isAdmin, dateCreated)
    VALUES ('${req.body?.email}', '${req.body?.username}', '${req.body?.password}', '${req.body?.passwordSalt}',
    '${req.body?.currentDate}', '0', '${req?.body?.currentDate}')`

  try {
    const insertUserResponse: OkPacket | ErrorResult = await manipulateWebsiteData(insertUserQuery)

    if (!isOkPacket(insertUserResponse)) {
      throw new Error(insertUserResponse?.error?.toString())
    }

    const newUserId = insertUserResponse?.insertId // What if we want our ID to be a GUID?
    //... WE generate the guid and provide it, so we wouldn't need to get it here! :)

    // Return a JSON result indicating success
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(newUserId))
  } catch (error) {
    console.log('An error occurred in the createUserAccount API: ', error)
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(`${error?.toString()}`))
  }
}

export default handler
