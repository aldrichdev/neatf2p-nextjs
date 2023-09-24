import { ErrorResult } from '@globalTypes/Database/ErrorResult'
import { UserDataRow } from '@globalTypes/Database/Users/UserDataRow'
import { queryWebsiteDatabase } from '@helpers/db'
import { NextApiRequest, NextApiResponse } from 'next'

interface Props {
  onlinePlayerCount: number
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Props>
) => {
  try {
    const { email, username } = req?.query
    const query = `SELECT id, emailAddress, username, password, passwordSalt, lastLogin, isAdmin
    FROM users
    WHERE emailAddress = '${email}' OR username = '${username}'`

    const response: UserDataRow[] | ErrorResult = await queryWebsiteDatabase(query)

    console.log('response', response)

    if (response instanceof Array) {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(response?.length))
    } else {
      throw new Error(response.error?.toString())
    }
  }
  catch (error) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(error?.toString()))
  }
}

export default handler
