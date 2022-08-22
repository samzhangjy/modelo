import { Code } from '@geist-ui/core'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import useCodeTheme from '../hooks/useCodeTheme'

const CodeBlock = ({
  className,
  children,
}: {
  className: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any
}) => {
  const codeTheme = useCodeTheme()
  let language = 'text'
  if (className && className.startsWith('lang-')) {
    language = className.replace('lang-', '')
  }

  return (
    <Code block margin={0}>
      <SyntaxHighlighter language={language} style={codeTheme}>
        {children}
      </SyntaxHighlighter>
    </Code>
  )
}

export default CodeBlock
