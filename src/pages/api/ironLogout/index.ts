import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '@models/session'
import { NextApiRequest, NextApiResponse } from 'next'
import { User } from '@globalTypes/User'
import { NullUser } from '@models/NullUser'

export default withIronSessionApiRoute(logoutRoute, sessionOptions)

function logoutRoute(req: NextApiRequest, res: NextApiResponse<User>) {
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

  req.session.destroy()
  res.json(NullUser)
}
