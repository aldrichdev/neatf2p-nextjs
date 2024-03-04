import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '@models/session'
import { NextApiRequest, NextApiResponse } from 'next'
import { NullUser } from '@models/NullUser'
import { User } from '@globalTypes/User'

export default withIronSessionApiRoute(userRoute, sessionOptions)

/** The `ironUser` route simply returns details on the current user that is logged in, or `NullUser`
 * if a user is not currently logged in. */
async function userRoute(req: NextApiRequest, res: NextApiResponse<User>) {
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

  if (req.session.user) {
    res.json(req.session.user)
  } else {
    res.json(NullUser)
  }
}
