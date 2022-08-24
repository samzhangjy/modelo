import { Button, Note, Page, Spacer, Text, useToasts } from '@geist-ui/core'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import SnipptContentEditor from '../../components/SnipptContentEditor'
import useAuth from '../../hooks/useAuth'
import useSnippts from '../../hooks/useSnippts'

const CreateSnippt: NextPage = () => {
  const router = useRouter()
  const snippts = useSnippts()
  const auth = useAuth()
  const toasts = useToasts()
  const isLoggedIn = auth.isLoggedIn().data?.isLoggedIn
  const [snipptData, setSnipptData] = useState({
    name: '',
    description: '',
    overview: '',
    code: '// Your code here\n',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    setIsSubmitting(true)

    const response = await snippts.create(snipptData)

    setIsSubmitting(false)

    if (response.status !== 'success') {
      toasts.setToast({
        text: response.msg,
        type: 'error',
      })
      return
    }
    toasts.setToast({
      text: 'Snippt created.',
      type: 'success',
    })
    router.push(`/snippts/${response.data?.id}`)
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

  return (
    <Page dotBackdrop>
      <Head>
        <title>Create snippt - Modelo</title>
      </Head>
      <Text h1>Create snippt</Text>
      <Spacer h={1} />
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
    </Page>
  )
}

export default CreateSnippt
