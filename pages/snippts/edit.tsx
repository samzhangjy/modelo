import {
  Button,
  Loading,
  Note,
  Page,
  Spacer,
  Text,
  useToasts,
} from '@geist-ui/core'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import SnipptContentEditor, {
  SnipptContent,
} from '../../components/SnipptContentEditor'
import useAuth from '../../hooks/useAuth'
import useSnippts from '../../hooks/useSnippts'

const EditSnippt: NextPage = () => {
  const router = useRouter()
  const snippts = useSnippts()
  const snippt = snippts.one(parseInt(router.query.id as string))
  const auth = useAuth()
  const toasts = useToasts()
  const isLoggedIn = auth.isLoggedIn().data?.isLoggedIn
  const [snipptData, setSnipptData] = useState({
    name: '',
    description: '',
    overview: '',
    code: '',
  } as SnipptContent)
  const [isSubmitting, setIsSubmitting] = useState(false)
  useEffect(() => {
    if (snippt.isLoading) return

    const snipptContent: SnipptContent = (snippt.data
      ?.data as SnipptContent) || {
      name: '',
      description: '',
      overview: '',
      code: '',
    }

    setSnipptData({
      name: snipptContent.name,
      description: snipptContent.description,
      overview: snipptContent.overview,
      code: snipptContent.code,
    })
  }, [snippt.isLoading, snippt.data?.data])

  const handleSubmit = async () => {
    setIsSubmitting(true)

    const response = await snippts.edit(
      snippt.data?.data?.id as number,
      snipptData
    )

    setIsSubmitting(false)

    if (response.status !== 'success') {
      toasts.setToast({
        text: response.msg,
        type: 'error',
      })
      return
    }
    toasts.setToast({
      text: 'Snippt updated.',
      type: 'success',
    })
    router.push(`/snippts/${snippt.data?.data?.id}`)
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

  if (snippt.isError) {
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
        <title>Edit snippt - Modelo</title>
      </Head>
      <Text h1>Edit snippt</Text>
      <Spacer h={1} />
      {snippt.isLoading ? (
        <Loading />
      ) : (
        <>
          <SnipptContentEditor snippt={snipptData} onChange={setSnipptData} />
          <Spacer h={1} />
          <Button
            type="success"
            width="100%"
            onClick={handleSubmit}
            loading={isSubmitting}
          >
            Submit
          </Button>
        </>
      )}
    </Page>
  )
}

export default EditSnippt
