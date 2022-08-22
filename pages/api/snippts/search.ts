import type { NextApiRequest, NextApiResponse } from 'next'
import { CodeSnippt, PrismaClient } from '@prisma/client'
import withErrorBoundary from '../../../lib/withErrorBoundary'

const prisma = new PrismaClient()

export type SearchSnipptsResponse = {
  data: CodeSnippt[]
  status: 'success' | 'error'
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchSnipptsResponse>
) {
  const originalKeyword: string = (req.query.kw as string) || ''
  const keyword = originalKeyword.split(' ').join(' | ')
  const results = await prisma.codeSnippt.findMany({
    orderBy: { createdAt: 'desc' },
    where: {
      OR: [
        {
          name: {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            search: keyword,
          },
        },
        {
          overview: {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            search: keyword,
          },
        },
        {
          description: {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            search: keyword,
          },
        },
      ],
    },
  })
  res.status(200).json({ data: results, status: 'success' })
}

export default withErrorBoundary(handler)
