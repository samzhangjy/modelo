import { Button, Input, Page, Spacer, Text, useToasts } from '@geist-ui/core'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'
import useAuth from '../../hooks/useAuth'

const Login: NextPage = () => {
  const auth = useAuth()
  const toasts = useToasts()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    const data = await auth.login(username, password)
    toasts.setToast({
      text: data.msg,
      type: data.status,
    })
    if (data.status === 'success') {
      window.location.href = '/'
    }
  }

  return (
    <Page dotBackdrop>
      <Head>
        <title>Login - Modelo</title>
      </Head>
      <Text h1>Login</Text>
      <Text>Login to Modelo admin.</Text>
      <Spacer h={1} />
      <Input
        placeholder="Username"
        width="100%"
        scale={1.2}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      >
        Username
      </Input>
      <Spacer h={1} />
      <Input.Password
        placeholder="Password"
        width="100%"
        scale={1.2}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      >
        Password
      </Input.Password>
      <Spacer h={2} />
      <Button type="success" width="100%" onClick={handleLogin}>
        Login
      </Button>
    </Page>
  )
}

export default Login
