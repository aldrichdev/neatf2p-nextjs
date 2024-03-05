import { NextApiRequest, NextApiResponse } from 'next'
import { User } from '@globalTypes/User'
import { handleManipulate } from '@helpers/api/apiHandler'

const handler = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  const { accountName, password, websiteAccountId, userIp } = req.body
  const creationDateMillis = Math.round(new Date().getTime() / 1000)

  const query = `INSERT INTO players (username, pass, creation_date, creation_ip, websiteUserId)
    VALUES (?, ?, ?, ?, ?)`

  // Create the player record and return the new record ID.
  return handleManipulate(
    'game',
    query,
    res,
    [accountName, password, creationDateMillis, userIp, websiteAccountId],
    true,
  )
}

export default handler
