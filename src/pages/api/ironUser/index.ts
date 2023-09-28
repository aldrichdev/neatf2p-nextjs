import { withIronSessionApiRoute } from "iron-session/next"
import { sessionOptions } from "@models/session"
import { NextApiRequest, NextApiResponse } from "next"
import { NullUser } from "@models/NullUser"
import { User } from "@globalTypes/User"

export default withIronSessionApiRoute(userRoute, sessionOptions)

/** The `ironUser` route simply returns details on the current user that is logged in, or `NullUser`
 * if a user is not currently logged in. */
async function userRoute(req: NextApiRequest, res: NextApiResponse<User>) {
  if (req.session.user) {
    res.json(req.session.user)
  } else {
    res.json(NullUser)
  }
}
