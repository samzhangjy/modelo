import { Card, Link, Spacer, Text } from '@geist-ui/core'
import { ArrowRight } from '@geist-ui/icons'
import { CodeSnippt as CodeSnipptModel } from '@prisma/client'
import NextLink from 'next/link'
import { FC } from 'react'

const Snippt: FC<{ data: CodeSnipptModel }> = ({ data }) => {
  return (
    <Card hoverable width="100%">
      <Text h4>{data.name}</Text>
      <Text>{data.overview}</Text>
      <Card.Footer>
        <NextLink href={`/snippts/${data.id}`}>
          <Link block>
            View snippt <Spacer inline w={0.1} /> <ArrowRight size={14} />
          </Link>
        </NextLink>
      </Card.Footer>
    </Card>
  )
}

export default Snippt
