import type { NextApiRequest, NextApiResponse } from 'next'
import { CodeSnippt, PrismaClient } from '@prisma/client'
import { StatusCodes } from 'http-status-codes'
import withErrorBoundary from '../../../lib/withErrorBoundary'

const prisma = new PrismaClient()

export type GetSnipptResponse = {
  data: CodeSnippt | null
  status: 'success' | 'error'
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetSnipptResponse>
) {
  const result = await prisma.codeSnippt.findFirst({
    where: {
      id: Number.parseInt(req.query.id as string),
    },
  })

  res.status(StatusCodes.ACCEPTED).json({ data: result, status: 'success' })
}

export default withErrorBoundary(handler)
