import { NextApiRequest, NextApiResponse } from 'next'
import { queryWebsiteDatabase } from '@helpers/db'
import { NewsPost } from '@globalTypes/NewsPost'
import { ErrorResult } from '@globalTypes/Database/ErrorResult'
import { UserIdentityInfo } from '@globalTypes/Database/Users/UserIdentityInfo'

const handler = async (req: NextApiRequest, res: NextApiResponse<NewsPost>) => {
  const query = `SELECT emailAddress, username FROM users`

  try {
    const response: UserIdentityInfo[] | ErrorResult = await queryWebsiteDatabase(query)

    if (response instanceof Array) {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(response))
    } else {
      throw new Error(response.error?.toString())
    }
  } catch (error) {
    console.log('An error occurred in the getExistingUserInfo API: ', error)
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(error?.toString()))
  }
}

export default handler
