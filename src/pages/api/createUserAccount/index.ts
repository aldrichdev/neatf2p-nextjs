import { NextApiRequest, NextApiResponse } from 'next'
import { queryDatabase, isOkPacket } from '@helpers/db'
import { OkPacket } from 'mysql'
import { ErrorResult } from '@globalTypes/Database/ErrorResult'
import { v4 as uuidv4 } from 'uuid'
import { User } from '@globalTypes/User'

const handler = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  const { email, username, password, passwordSalt, currentDate } = req.body

  // Generate GUID for new user accounts
  const newGuid = uuidv4()

  const insertUserQuery = `INSERT INTO users (id, emailAddress, username, password, passwordSalt, lastLogin, isAdmin, dateCreated)
    VALUES (?, ?, ?, ?, ?, ?, '0', ?)`

  try {
    const insertUserResponse: OkPacket | ErrorResult = await queryDatabase('website', insertUserQuery, [
      newGuid,
      email,
      username,
      password,
      passwordSalt,
      currentDate,
      currentDate,
    ])

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
