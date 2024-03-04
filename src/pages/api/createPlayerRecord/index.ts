import { NextApiRequest, NextApiResponse } from 'next'
import { User } from '@globalTypes/User'
import { handleManipulate } from '@helpers/api/apiHandler'

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

  const { accountName, password, websiteAccountId, userIp } = req.body
  const creationDateMillis = Math.round(new Date().getTime() / 1000)

  const query = `INSERT INTO players (username, pass, creation_date, creation_ip, websiteUserId)
    VALUES ('${accountName}', '${password}', ${creationDateMillis}, '${userIp}', '${websiteAccountId}')`

  // Create the player record and return the new record ID.
  return handleManipulate('game', query, res, true)
}

export default handler
