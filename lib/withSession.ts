import { StatusCodes } from 'http-status-codes'
import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiHandler } from 'next'

declare module 'iron-session' {
  interface IronSessionData {
    isLoggedIn?: boolean
  }
}

const sessionOptions = {
  password: process.env.SESSION_PASSWORD || '',
  cookieName: 'modelo',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
}

export function withSessionRoute(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, sessionOptions)
}

export function withProtectedRoute(handler: NextApiHandler) {
  return withSessionRoute((req, res) => {
    if (!req.session.isLoggedIn) {
      res
        .status(StatusCodes.FORBIDDEN)
        .json({ data: null, status: 'error', msg: 'Please login first.' })
      return
    }

    handler(req, res)
  })
}
