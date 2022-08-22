import type { NextApiRequest, NextApiResponse } from 'next'
import { CodeTemplate, PrismaClient } from '@prisma/client'
import withErrorBoundary from '../../../lib/withErrorBoundary'

const prisma = new PrismaClient()

export type GetTemplatesResponse = {
  data: CodeTemplate[]
  status: 'success' | 'error'
}

async function handler(
  _req: NextApiRequest,
  res: NextApiResponse<GetTemplatesResponse>
) {
  const results = await prisma.codeTemplate.findMany({
    orderBy: { createdAt: 'desc' },
  })
  res.status(200).json({ data: results, status: 'success' })
}

export default withErrorBoundary(handler)
