import { Code, Text } from '@geist-ui/core'
import BaseMarkdown from 'markdown-to-jsx'
import CodeBlock from './CodeBlock'

const h1 = <Text h1 />
const h2 = <Text h2 />
const h3 = <Text h3 />
const h4 = <Text h4 />
const h5 = <Text h5 />
const h6 = <Text h6 />
const blockquote = <Text blockquote />
const i = <Text i />
const b = <Text b />

const pre = ({ children, ...rest }: { children: never; rest: never[] }) => {
  if ('type' in children && children['type'] === 'code') {
    return CodeBlock(children['props'])
  }

  return (
    <Code {...rest} block>
      {children}
    </Code>
  )
}

const Markdown = ({ source }: { source: string }) => {
  return (
    <BaseMarkdown
      options={{
        overrides: {
          h1,
          h2,
          h3,
          h4,
          h5,
          h6,
          i,
          b,
          blockquote,
          pre,
        },
      }}
    >
      {source}
    </BaseMarkdown>
  )
}

export default Markdown
