import type { User } from '@globalTypes/User'
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '@models/session'
import { NextApiRequest, NextApiResponse } from 'next'

export default withIronSessionApiRoute(loginRoute, sessionOptions)

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
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

  const { id, username, emailAddress, lastLogin, isAdmin } = await req.body

  try {
    const user: User = {
      id,
      username,
      emailAddress,
      lastLogin,
      isAdmin,
    }
    req.session.user = user
    await req.session.save()
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
}
