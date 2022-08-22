import {
  Button,
  Code,
  Input,
  Loading,
  Note,
  Page,
  Spacer,
  Tabs,
  Text,
  Textarea,
  useToasts,
} from '@geist-ui/core'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Editor from 'react-simple-code-editor'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import Markdown from '../../components/Markdown'
import useAuth from '../../hooks/useAuth'
import useCodeTheme from '../../hooks/useCodeTheme'
import useLanguage from '../../hooks/useLanguage'
import useTemplates from '../../hooks/useTemplates'

const EditTemplate: NextPage = () => {
  const router = useRouter()
  const templates = useTemplates()
  const template = templates.one(parseInt(router.query.id as string))
  const auth = useAuth()
  const language = useLanguage()
  const codeTheme = useCodeTheme()
  const toasts = useToasts()
  const isLoggedIn = auth.isLoggedIn().data?.isLoggedIn
  const [templateData, setTemplateData] = useState({
    name: '',
    description: '',
    overview: '',
    code: '',
  })
  useEffect(() => {
    if (template.isLoading) return

    setTemplateData({
      name: template.data?.data?.name || '',
      description: template.data?.data?.description || '',
      overview: template.data?.data?.overview || '',
      code: template.data?.data?.code || '',
    })
  }, [
    template.isLoading,
    template.data?.data?.name,
    template.data?.data?.description,
    template.data?.data?.overview,
    template.data?.data?.code,
  ])

  const handleSubmit = async () => {
    const response = await templates.edit(
      template.data?.data?.id as number,
      templateData
    )

    if (response.status !== 'success') {
      toasts.setToast({
        text: response.msg,
        type: 'error',
      })
      return
    }
    toasts.setToast({
      text: 'Template updated.',
      type: 'success',
    })
    router.push(`/templates/${template.data?.data?.id}`)
  }

  if (!isLoggedIn) {
    return (
      <Page dotBackdrop>
        <Note type="error" label="ERROR">
          <Text>Forbidden. Please login first.</Text>
        </Note>
      </Page>
    )
  }

  if (template.isError) {
    return (
      <Page dotBackdrop>
        <Note type="error" label="ERROR">
          <Text>An unexpected error occured. Please try again.</Text>
        </Note>
      </Page>
    )
  }

  return (
    <Page dotBackdrop>
      <Head>
        <title>Edit template - Modelo</title>
      </Head>
      <Text h1>Edit template</Text>
      {template.isLoading ? (
        <Loading />
      ) : (
        <>
          <Spacer h={1} />
          <Input
            value={templateData.name}
            width="100%"
            scale={1.2}
            onChange={(e) =>
              setTemplateData({ ...templateData, name: e.target.value })
            }
            placeholder="Name"
          >
            Name
          </Input>
          <Spacer h={1} />
          <Input
            value={templateData.overview}
            width="100%"
            scale={1.2}
            onChange={(e) =>
              setTemplateData({ ...templateData, overview: e.target.value })
            }
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
                value={templateData.description}
                width="100%"
                onChange={(e) =>
                  setTemplateData({
                    ...templateData,
                    description: e.target.value,
                  })
                }
                placeholder="Markdown is supported."
                resize="vertical"
                scale={1.2}
              />
            </Tabs.Item>
            <Tabs.Item value="preview" label="Preview">
              <Markdown source={templateData.description} />
            </Tabs.Item>
          </Tabs>
          <Spacer h={1} />
          <Text type="secondary" mt={0} mb={0.3}>
            Code
          </Text>
          <Code block>
            <Editor
              value={templateData.code}
              onValueChange={(code) =>
                setTemplateData({ ...templateData, code: code })
              }
              highlight={(code) => (
                <SyntaxHighlighter
                  language={language.detect(code)}
                  style={codeTheme}
                >
                  {code}
                </SyntaxHighlighter>
              )}
              className="code-editor"
            />
          </Code>
          <Spacer h={1} />
          <Button type="success" width="100%" onClick={handleSubmit}>
            Submit
          </Button>
        </>
      )}
    </Page>
  )
}

export default EditTemplate
