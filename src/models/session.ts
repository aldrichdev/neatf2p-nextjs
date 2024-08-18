// This file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions.
import type { IronSessionOptions } from 'iron-session'
import { User } from '@globalTypes/User'
import { isProduction } from '@helpers/envUtils'

export const sessionOptions: IronSessionOptions = {
  password: process.env.SECRET_COOKIE_PASSWORD as string,
  cookieName: 'neat-f2p-session',
  cookieOptions: {
    secure: isProduction(),
  },
}

// This is where we specify the typings of req.session.user.
declare module 'iron-session' {
  interface IronSessionData {
    user?: User
  }
}
