import { NextApiRequest, NextApiResponse } from 'next'
import { manipulateWebsiteData, isOkPacket } from '@helpers/db'
import { OkPacket } from 'mysql'
import { ErrorResult } from '@globalTypes/Database/ErrorResult'
import { v4 as uuidv4 } from 'uuid'
import { User } from '@globalTypes/User'

const handler = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  // Generate GUID for new user accounts
  const newGuid = uuidv4()

  const insertUserQuery = `INSERT INTO users (id, emailAddress, username, password, passwordSalt, lastLogin, isAdmin, dateCreated)
    VALUES ('${newGuid}', '${req.body?.email}', '${req.body?.username}', '${req.body?.password}', '${req.body?.passwordSalt}',
    '${req.body?.currentDate}', '0', '${req?.body?.currentDate}')`

  try {
    const insertUserResponse: OkPacket | ErrorResult = await manipulateWebsiteData(insertUserQuery)

    if (!isOkPacket(insertUserResponse)) {
      throw new Error(insertUserResponse?.error?.toString())
    }

    // Return a JSON result indicating success
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(newGuid))
  } catch (error) {
    console.log('An error occurred in the createUserAccount API: ', error)
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(`${error?.toString()}`))
  }
}

export default handler
