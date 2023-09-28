import { NextApiRequest, NextApiResponse } from 'next'
import { queryWebsiteDatabase } from '@helpers/db'
import { NewsPost } from '@globalTypes/NewsPost'
import { ErrorResult } from '@globalTypes/Database/ErrorResult'
import { UserDataRow } from '@globalTypes/Database/Users/UserDataRow'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<NewsPost>
) => {
  const { user } = req?.query
  const query = `SELECT id, emailAddress, username, password, passwordSalt, lastLogin, isAdmin
    FROM users
    WHERE emailAddress = '${user}' OR username = '${user}'`

  try {
    const response: UserDataRow[] | ErrorResult = await queryWebsiteDatabase(query)

    if (response instanceof Array) {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(response?.[0]))
    } else {
      throw new Error(response.error?.toString())
    }
  }
  catch (error) {
    console.log('An error occurred in the getUser API: ', error)
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(error?.toString()))
  }
}

export default handler
