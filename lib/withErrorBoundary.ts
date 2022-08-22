import { StatusCodes } from 'http-status-codes'
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

export default function withErrorBoundary(handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      return await handler(req, res)
    } catch (err) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ status: 'error', msg: (err as Error).message.trim() || err })
    }
  }
}
