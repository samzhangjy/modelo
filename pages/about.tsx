import { Code, Link, Page, Text } from '@geist-ui/core'
import { NextPage } from 'next'
import Head from 'next/head'

const About: NextPage = () => {
  return (
    <Page dotBackdrop>
      <Head>
        <title>About - Modelo</title>
      </Head>
      <Text h1>About</Text>
      <Text>
        Modelo is a personal website for storing code snippts, anywhere and
        anytime.
      </Text>
      <Text>
        I developed it for storing code templates for OI but it can store
        anything you wanted. Each snippt contains four sections:{' '}
        <Code>name</Code>, <Code>overview</Code>, <Code>description</Code> and{' '}
        <Code>code</Code>. Here the <Code>description</Code> section is for a
        more in-detailed explaination of the snippt whereas{' '}
        <Code>overview</Code> is just a remark for yourself.
      </Text>
      <Text>
        Modelo is built using React and Nextjs API routes, so you can host it
        anywhere you wanted as long as having a server. However it may be
        incomplete though - it{"'"}s only for my personal use. But feel free to
        open an issue if you found a bug.
      </Text>
      <Text>
        Modelo is available at{' '}
        <Link href="https://github.com/samzhangjy/modelo" target="_blank" block>
          GitHub
        </Link>
        . Leave me a star if you like it!
      </Text>
    </Page>
  )
}

export default About
