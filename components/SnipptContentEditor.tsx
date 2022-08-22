import { Code, Input, Spacer, Tabs, Text, Textarea } from '@geist-ui/core'
import Editor from 'react-simple-code-editor'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import useCodeTheme from '../hooks/useCodeTheme'
import useLanguage from '../hooks/useLanguage'
import Markdown from './Markdown'

export type SnipptContent = {
  name: string
  overview: string
  description: string
  code: string
}

export type SnipptContentEditorProps = {
  snippt: SnipptContent
  onChange: (snippt: SnipptContent) => void
}

const SnipptContentEditor = ({
  snippt,
  onChange,
}: SnipptContentEditorProps) => {
  const codeTheme = useCodeTheme()
  const language = useLanguage()

  const handleUpdate = (snippt: SnipptContent) => {
    onChange(snippt)
  }

  return (
    <>
      <Input
        value={snippt.name}
        width="100%"
        scale={1.2}
        onChange={(e) => handleUpdate({ ...snippt, name: e.target.value })}
        placeholder="Name"
      >
        Name
      </Input>
      <Spacer h={1} />
      <Input
        value={snippt.overview}
        width="100%"
        scale={1.2}
        onChange={(e) => handleUpdate({ ...snippt, overview: e.target.value })}
        placeholder="Overview"
      >
        Overview
      </Input>
      <Spacer h={1} />
      <Text type="secondary" mt={0} mb={0.3}>
        Additional description
      </Text>
      <Tabs initialValue="editor">
        <Tabs.Item value="editor" label="Editor">
          <Textarea
            value={snippt.description}
            width="100%"
            onChange={(e) =>
              handleUpdate({
                ...snippt,
                description: e.target.value,
              })
            }
            placeholder="Markdown is supported."
            resize="vertical"
            scale={1.2}
          />
        </Tabs.Item>
        <Tabs.Item value="preview" label="Preview">
          <Markdown source={snippt.description} />
        </Tabs.Item>
      </Tabs>
      <Spacer h={1} />
      <Text type="secondary" mt={0} mb={0.3}>
        Code
      </Text>
      <Code block>
        <Editor
          value={snippt.code}
          onValueChange={(code) => handleUpdate({ ...snippt, code: code })}
          highlight={(code) => (
            <SyntaxHighlighter
              language={language.detect(code)}
              style={codeTheme}
            >
              {code}
            </SyntaxHighlighter>
          )}
        />
      </Code>
    </>
  )
}

export default SnipptContentEditor
