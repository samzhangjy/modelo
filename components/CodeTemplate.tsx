import { Card, Link, Text } from '@geist-ui/core'
import { CodeTemplate as CodeTemplateModel } from '@prisma/client'
import NextLink from 'next/link'
import { FC } from 'react'

const CodeTemplate: FC<{ data: CodeTemplateModel }> = ({ data }) => {
  return (
    <Card hoverable width="100%">
      <Text h4>{data.name}</Text>
      <Text>{data.overview}</Text>
      <Card.Footer>
        <NextLink href={`/templates/${data.id}`}>
          <Link block>View template</Link>
        </NextLink>
      </Card.Footer>
    </Card>
  )
}

export default CodeTemplate
