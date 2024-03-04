import { NextApiRequest, NextApiResponse } from 'next'
import { handleManipulate } from '@helpers/api/apiHandler'
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

  const { userId, newPassword, newPasswordSalt } = req.body
  const now = new Date().toISOString()
  const query = `UPDATE users SET password = '${newPassword}', passwordSalt = '${newPasswordSalt}', dateModified = '${now}' WHERE id = '${userId}'`

  return handleManipulate('website', query, res)
}

export default handler
