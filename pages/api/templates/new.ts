import type { NextApiRequest, NextApiResponse } from 'next'
import { CodeTemplate, PrismaClient } from '@prisma/client'
import { StatusCodes } from 'http-status-codes'
import { withProtectedRoute } from '../../../lib/withSession'
import withValidation from '../../../lib/withValidation'
import { CodeTemplateSchema } from '../../../lib/common'
import withErrorBoundary from '../../../lib/withErrorBoundary'

const prisma = new PrismaClient()

export type CreateTemplateResponse = {
  data: CodeTemplate | null
  status: 'success' | 'error'
  msg?: string
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CreateTemplateResponse>
) {
  if (req.method !== 'POST') {
    res
      .status(StatusCodes.METHOD_NOT_ALLOWED)
      .json({ data: null, status: 'error', msg: 'Bad request.' })
    return
  }

  const result = await prisma.codeTemplate.create({
    data: req.body,
  })

  res.status(StatusCodes.ACCEPTED).json({ data: result, status: 'success' })
}

export default withProtectedRoute(
  withValidation({ body: CodeTemplateSchema }, withErrorBoundary(handler))
)
