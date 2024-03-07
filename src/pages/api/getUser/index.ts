import { NextApiRequest, NextApiResponse } from 'next'
import { queryDatabase } from '@helpers/db'
import { ErrorResult } from '@globalTypes/Database/ErrorResult'
import { UserDataRow } from '@globalTypes/Database/Users/UserDataRow'
import { User } from '@globalTypes/User'

const handler = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  const { email } = req.query

  if (!email || typeof email !== 'string') {
    res.statusCode = 400
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify('Missing or malformed usernameOrEmail provided to getUser.'))
    return
  }

  const query = `CALL GetUser(?)`

  try {
    const response: UserDataRow[] | ErrorResult = await queryDatabase('website', query, [email])

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
