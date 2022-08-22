import { StatusCodes } from 'http-status-codes'
import { NextApiRequest, NextApiResponse } from 'next'
import { withSessionRoute } from '../../../lib/withSession'
import withErrorBoundary from '../../../lib/withErrorBoundary'

export type LoginResponse = {
  msg: string
  status: 'success' | 'error'
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginResponse>
) {
  if (req.method !== 'POST') {
    console.log('!!')
    res
      .status(StatusCodes.METHOD_NOT_ALLOWED)
      .json({ msg: 'Bad request.', status: 'error' })
    return
  }

  if (
    req.body.username !== process.env.ADMIN_USERNAME ||
    req.body.password !== process.env.ADMIN_PASSWORD
  ) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: 'Wrong username or password.', status: 'error' })
    return
  }

  req.session.isLoggedIn = true
  await req.session.save()
  res.status(StatusCodes.OK).json({ msg: 'Login success!', status: 'success' })
}

export default withSessionRoute(withErrorBoundary(handler))
