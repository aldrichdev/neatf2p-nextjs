import { NextApiRequest, NextApiResponse } from 'next'
import { User } from '@globalTypes/User'
import { handleUpdate } from '@helpers/apiHandler'

const handler = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  const { accountName, password, websiteAccountId, userIp } = req.body
  const creationDateMillis = Math.round(new Date().getTime() / 1000)
  console.log('websiteAccountId in handler', websiteAccountId)

  const query = `INSERT INTO players (username, pass, creation_date, creation_ip, websiteUserId)
    VALUES ('${accountName}', '${password}', ${creationDateMillis}, '${userIp}', '${websiteAccountId}')`

  return handleUpdate('game', query, res)
}

export default handler
