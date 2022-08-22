import { StatusCodes } from 'http-status-codes'
import { NextApiRequest, NextApiResponse } from 'next'
import withErrorBoundary from '../../../lib/withErrorBoundary'
import { withSessionRoute } from '../../../lib/withSession'

export type LogoutResponse = {
  msg: string
  status: 'success' | 'error'
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LogoutResponse>
) {
  if (!req.session.isLoggedIn) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: 'You are not logged in yet.', status: 'error' })
    return
  }

  req.session.destroy()
  res
    .status(StatusCodes.ACCEPTED)
    .json({ msg: 'Logged out.', status: 'success' })
}

export default withSessionRoute(withErrorBoundary(handler))
