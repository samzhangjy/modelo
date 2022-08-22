import type { NextApiRequest, NextApiResponse } from 'next'
import { CodeSnippt, PrismaClient } from '@prisma/client'
import withErrorBoundary from '../../../lib/withErrorBoundary'

const prisma = new PrismaClient()

export type GetSnipptsResponse = {
  data: CodeSnippt[]
  totalEntries: number
  status: 'success' | 'error'
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetSnipptsResponse>
) {
  const skip: string = (req.query.skip as string | undefined) ?? '0',
    take: string = (req.query.take as string | undefined) ?? '10'
  const totalEntries = await prisma.codeSnippt.count()
  const results = await prisma.codeSnippt.findMany({
    skip: Math.min(parseInt(skip), totalEntries),
    take: Math.min(parseInt(take), totalEntries),
    orderBy: { createdAt: 'desc' },
  })
  res.status(200).json({ data: results, status: 'success', totalEntries })
}

export default withErrorBoundary(handler)
