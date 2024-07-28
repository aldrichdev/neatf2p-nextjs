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

  const insertUserQuery = `INSERT INTO users (id, emailAddress, username, password, passwordSalt, 
    lastLogin, isAdmin, dateCreated)
    SELECT ?, ?, ?, ?, ?, ?, '0', ? FROM DUAL
    WHERE NOT EXISTS (SELECT * FROM users WHERE emailAddress = ? OR username = ? LIMIT 1)`

  try {
    const insertUserResponse: OkPacket | ErrorResult = await queryDatabase('website', insertUserQuery, [
      newGuid,
      email,
      username,
      password,
      passwordSalt,
      currentDate,
      currentDate,
      email,
      username,
    ])

    if (!isOkPacket(insertUserResponse)) {
      res.statusCode = 500
      res.setHeader('Content-Type', 'application/json')
      res.end(
        JSON.stringify(
          insertUserResponse?.error
            ? insertUserResponse.error.toString()
            : 'An error occurred. The email address or username you chose may be taken. Please try a different one.',
        ),
      )
      return
    }

    if (insertUserResponse?.affectedRows < 1) {
      throw new Error(`No rows affected. Response: ${insertUserResponse}`)
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
