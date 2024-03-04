import { NextApiRequest, NextApiResponse } from 'next'
import { queryDatabase } from '@helpers/db'
import { ErrorResult } from '@globalTypes/Database/ErrorResult'
import { UserDataRow } from '@globalTypes/Database/Users/UserDataRow'
import { User } from '@globalTypes/User'

const handler = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  // Block requests from non-app sources
  if (process.env.NEXT_PUBLIC_API_SECRET) {
    const secretHeader = req.headers[process.env.NEXT_PUBLIC_API_SECRET]

    if (!secretHeader) {
      res.statusCode = 401
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify('Unauthorized'))
      return
    }
  }

  const { user } = req.query
  const query = `SELECT id, emailAddress, username, password, passwordSalt, lastLogin, isAdmin
    FROM users
    WHERE emailAddress = '${user}' OR username = '${user}'`

  try {
    const response: UserDataRow[] | ErrorResult = await queryDatabase('website', query)

    if (response instanceof Array) {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(response?.[0]))
    } else {
      throw new Error(response.error?.toString())
    }
  } catch (error) {
    console.log('An error occurred in the getUser API: ', error)
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(error?.toString()))
  }
}

export default handler
