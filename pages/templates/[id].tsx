import {
  Button,
  Code,
  Loading,
  Modal,
  Note,
  Page,
  Spacer,
  Text,
  useModal,
  useToasts,
} from '@geist-ui/core'
import { Edit3, Trash } from '@geist-ui/icons'
import moment from 'moment'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import CodeBlock from '../../components/CodeBlock'
import Markdown from '../../components/Markdown'
import useAuth from '../../hooks/useAuth'
import useLanguage from '../../hooks/useLanguage'
import useTemplates from '../../hooks/useTemplates'

const ViewTemplate: NextPage = () => {
  const router = useRouter()
  const templates = useTemplates()
  const auth = useAuth()
  const isLoggedIn = auth.isLoggedIn().data?.isLoggedIn
  const toasts = useToasts()

  const template = templates.one(parseInt(router.query.id as string))
  const language = useLanguage()
  const codeLanguage = !(template.isLoading || template.isError)
    ? language.detect(template.data?.data?.code || '')
    : 'text'
  const {
    visible: confirmModalVisible,
    setVisible: setConfirmModalVisible,
    bindings: confirmModalBindings,
  } = useModal()

  const handleDelete = async () => {
    const response = await templates.delete(template.data?.data?.id as number)
    if (response.status !== 'success') {
      toasts.setToast({
        text: response.msg,
        type: 'error',
      })
      return
    }
    toasts.setToast({
      text: `Deleted template ${template.data?.data?.name}.`,
      type: 'success',
    })
    router.push('/')
  }

  return (
    <Page dotBackdrop>
      <Head>
        <title>
          {template.isLoading || template.isError
            ? 'Loading'
            : template.data?.data?.name}{' '}
          - Modelo
        </title>
      </Head>
      {template.isLoading || template.isError ? (
        <>
          {template.isError ? (
            <Note type="error" label="ERROR">
              Failed to load template. Please try again.
            </Note>
          ) : (
            <Loading />
          )}
        </>
      ) : (
        <>
          <Text h1>{template.data?.data?.name}</Text>
          <Text i>{template.data?.data?.overview}</Text>
          <Text type="secondary">
            Last updated on{' '}
            {moment(template.data?.data?.updatedAt).format('LL')}.
          </Text>
          <Modal {...confirmModalBindings}>
            <Modal.Title>Confirm</Modal.Title>
            <Modal.Subtitle>Delete confirmation</Modal.Subtitle>
            <Modal.Content>
              <Text>
                Do you really want to delete template{' '}
                <Code>{template.data?.data?.name}</Code>?
              </Text>
              <Text b>This action is irreversible!</Text>
            </Modal.Content>
            <Modal.Action passive onClick={() => setConfirmModalVisible(false)}>
              Cancel
            </Modal.Action>
            <Modal.Action type="error" onClick={handleDelete}>
              Delete
            </Modal.Action>
          </Modal>
          {isLoggedIn && (
            <>
              <Button
                type="success"
                auto
                scale={0.5}
                ghost
                icon={<Edit3 />}
                onClick={() =>
                  router.push(`/templates/edit?id=${template.data?.data?.id}`)
                }
              >
                Edit
              </Button>
              <Spacer w={0.5} inline />
              <Button
                type="error"
                auto
                scale={0.5}
                ghost
                icon={<Trash />}
                onClick={() => setConfirmModalVisible(!confirmModalVisible)}
              >
                Delete
              </Button>
              <Spacer h={1.5} />
            </>
          )}
          {template.data?.data?.description ? (
            <Markdown source={template.data?.data?.description || ''} />
          ) : (
            <Text i>No additional description privided.</Text>
          )}
          <Spacer h={2} />
          <Text h2>Code</Text>
          <CodeBlock className={`lang-${codeLanguage}`}>
            {template.data?.data?.code}
          </CodeBlock>
        </>
      )}
    </Page>
  )
}

export default ViewTemplate
