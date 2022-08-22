import type { NextApiRequest, NextApiResponse } from 'next'
import { CodeSnippt, PrismaClient } from '@prisma/client'
import { StatusCodes } from 'http-status-codes'
import { withProtectedRoute } from '../../../lib/withSession'
import withErrorBoundary from '../../../lib/withErrorBoundary'

const prisma = new PrismaClient()

export type DeleteSnipptResponse = {
  data: CodeSnippt | null
  status: 'success' | 'error'
  msg?: string
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DeleteSnipptResponse>
) {
  if (req.method !== 'DELETE') {
    res
      .status(StatusCodes.METHOD_NOT_ALLOWED)
      .json({ data: null, status: 'error' })
    return
  }

  if (!req.session.isLoggedIn) {
    res
      .status(StatusCodes.FORBIDDEN)
      .json({ data: null, status: 'error', msg: 'Please login first.' })
    return
  }

  const result = await prisma.codeSnippt.delete({
    where: {
      id: Number.parseInt(req.query.id as string),
    },
  })

  res.status(StatusCodes.ACCEPTED).json({ data: result, status: 'success' })
}

export default withProtectedRoute(withErrorBoundary(handler))
