import { Loading, Note, Page, Spacer, Text } from '@geist-ui/core'
import moment from 'moment'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import CodeBlock from '../../components/CodeBlock'
import Markdown from '../../components/Markdown'
import SnipptActions from '../../components/SnipptActions'
import useAuth from '../../hooks/useAuth'
import useLanguage from '../../hooks/useLanguage'
import useSnippts from '../../hooks/useSnippts'

const ViewSnippt: NextPage = () => {
  const router = useRouter()
  const snippts = useSnippts()
  const auth = useAuth()
  const isLoggedIn = auth.isLoggedIn().data?.isLoggedIn

  const currentSnippt = snippts.one(parseInt(router.query.id as string))
  const language = useLanguage()
  const codeLanguage = !(currentSnippt.isLoading || currentSnippt.isError)
    ? language.detect(currentSnippt.data?.data?.code || '')
    : 'text'

  return (
    <Page dotBackdrop>
      <Head>
        <title>
          {currentSnippt.isLoading || currentSnippt.isError
            ? 'Loading'
            : currentSnippt.data?.data?.name}{' '}
          - Modelo
        </title>
      </Head>
      {currentSnippt.isLoading || currentSnippt.isError ? (
        <>
          {currentSnippt.isError ? (
            <Note type="error" label="ERROR">
              Failed to load snippt. Please try again.
            </Note>
          ) : (
            <Loading />
          )}
        </>
      ) : (
        <>
          <Text h1>{currentSnippt.data?.data?.name}</Text>
          <Text i>{currentSnippt.data?.data?.overview}</Text>
          <Text type="secondary">
            Last updated on{' '}
            {moment(currentSnippt.data?.data?.updatedAt).format('LL')}.
          </Text>
          {isLoggedIn && <SnipptActions snippt={currentSnippt.data} />}
          {currentSnippt.data?.data?.description ? (
            <Markdown source={currentSnippt.data?.data?.description || ''} />
          ) : (
            <Text i>No additional description privided.</Text>
          )}
          <Spacer h={2} />
          <Text h2>Code</Text>
          <CodeBlock className={`lang-${codeLanguage}`}>
            {currentSnippt.data?.data?.code}
          </CodeBlock>
        </>
      )}
    </Page>
  )
}

export default ViewSnippt
