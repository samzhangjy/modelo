import type { NextApiRequest, NextApiResponse } from 'next'
import { CodeTemplate, PrismaClient } from '@prisma/client'
import { StatusCodes } from 'http-status-codes'
import withErrorBoundary from '../../../lib/withErrorBoundary'

const prisma = new PrismaClient()

export type GetTemplateResponse = {
  data: CodeTemplate | null
  status: 'success' | 'error'
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetTemplateResponse>
) {
  const result = await prisma.codeTemplate.findFirst({
    where: {
      id: Number.parseInt(req.query.id as string),
    },
  })

  res.status(StatusCodes.ACCEPTED).json({ data: result, status: 'success' })
}

export default withErrorBoundary(handler)
