import type { User } from '@globalTypes/User'
import { withIronSessionApiRoute } from "iron-session/next"
import { sessionOptions } from "@models/session"
import { NextApiRequest, NextApiResponse } from "next"

export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { id, username, email, lastLogin, isAdmin } = await req.body;

  try {
    const user: User = {
      id,
      username,
      emailAddress: email,
      lastLogin,
      isAdmin,
    }
    req.session.user = user;
    await req.session.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
}