import { NextApiRequest, NextApiResponse } from 'next'
import { queryWebsiteDatabase } from '@helpers/db'
import { NewsPost } from 'src/globalTypes/NewsPost'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<NewsPost>
) => {
  try {
    const { user } = req?.query
    const query = `SELECT id, emailAddress, username, password, passwordSalt, lastLogin, isAdmin
      FROM users
      WHERE emailAddress = '${user}' OR username = '${user}'`

    // TODO: Couldn't we use UserDataRow here instead of Array<any>?
    const response: Array<any> | { error: unknown } = await queryWebsiteDatabase(query)

    console.log('response', response)

    if (response instanceof Array) {
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(response?.[0]))
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
