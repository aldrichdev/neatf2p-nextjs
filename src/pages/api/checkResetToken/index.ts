import { NextApiRequest, NextApiResponse } from 'next'
import { User } from '@globalTypes/User'
import { handleQuery } from '@helpers/api/apiHandler'
import { UserDataRow } from '@globalTypes/Database/Users/UserDataRow'

const handler = async (req: NextApiRequest, res: NextApiResponse<User>) => {
  const resetToken = req.headers?.['resettoken']

  if (!resetToken || typeof resetToken !== 'string') {
    res.statusCode = 400
    res.setHeader('Content-Type', 'application/json')
    res.end(
      JSON.stringify(
        `The reset token could not be retrieved due to a malformed request. 
        This could be due to the reset token not being supplied or it not being a valid string.`,
      ),
    )
    return
  }

  // Check dateModified in the query so this API call can't return user IDs forever.
  const query = `SELECT id, dateModified FROM users WHERE resetToken = ?
    AND TIMESTAMP(dateModified) > UTC_TIMESTAMP() - INTERVAL 10 MINUTE`

  return handleQuery<UserDataRow>('website', query, res, [resetToken])
}

export default handler
