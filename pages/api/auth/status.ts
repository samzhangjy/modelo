import { StatusCodes } from 'http-status-codes'
import { NextApiRequest, NextApiResponse } from 'next'
import withErrorBoundary from '../../../lib/withErrorBoundary'
import { withSessionRoute } from '../../../lib/withSession'

export type AuthenticationStatusResponse = {
  isLoggedIn: boolean
  status: 'success' | 'error'
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AuthenticationStatusResponse>
) {
  res
    .status(StatusCodes.ACCEPTED)
    .json({ isLoggedIn: !!req.session.isLoggedIn, status: 'success' })
}

export default withSessionRoute(withErrorBoundary(handler))
