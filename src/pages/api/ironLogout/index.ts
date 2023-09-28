import { withIronSessionApiRoute } from "iron-session/next"
import { sessionOptions } from "@models/session"
import { NextApiRequest, NextApiResponse } from "next"
import { User } from "@globalTypes/User"
import { NullUser } from "@models/NullUser"

export default withIronSessionApiRoute(logoutRoute, sessionOptions)

function logoutRoute(req: NextApiRequest, res: NextApiResponse<User>) {
  req.session.destroy()
  res.json(NullUser)
}
