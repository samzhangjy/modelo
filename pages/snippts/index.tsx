import {
  Input,
  Loading,
  Note,
  Page,
  Pagination,
  Spacer,
  Text,
} from '@geist-ui/core'
import { ChevronLeft, ChevronRight, Search } from '@geist-ui/icons'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Snippts from '../../components/Snippts'
import config from '../../config'
import useSnippts from '../../hooks/useSnippts'

const ViewSnippts: NextPage = () => {
  const snippts = useSnippts()
  const router = useRouter()
  const [searchInput, setSearchInput] = useState('')
  const skip = parseInt((router.query.skip as string) || '0')
  const take = parseInt(
    (router.query.take as string) || '' + config.site.entriesPerPage
  )
  const keyword = router.query.kw as string
  let currentSnippts = null

  if (keyword) {
    currentSnippts = snippts.search(keyword)
  } else {
    currentSnippts = snippts.all(skip, take)
  }

  const handleSearch = () => {
    router.push(`/snippts?kw=${searchInput}`)
  }

  return (
    <Page dotBackdrop>
      <Head>
        <title>Snippts - Modelo</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Text h1>Snippts</Text>

      <Spacer h={2} />

      <Input
        icon={<Search />}
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyDown={(e) => e.code === 'Enter' && handleSearch()}
        placeholder="Search snippts..."
      />

      <Spacer inline w={1} />

      <Spacer h={2} />

      {currentSnippts.isError && (
        <Note type="error" label="ERROR">
          Failed to load snippts. Please try again.
        </Note>
      )}

      {currentSnippts.isLoading || currentSnippts.isError ? (
        <>{currentSnippts.isLoading && <Loading />}</>
      ) : (
        <Snippts snippts={currentSnippts.data?.data || []} />
      )}
      <Spacer h={3} />
      {currentSnippts.data?.totalEntries && (
        <Pagination
          count={Math.ceil(
            (currentSnippts.data?.totalEntries || 0) /
              config.site.entriesPerPage
          )}
          onChange={(page) =>
            router.push(
              `/snippts?skip=${(page - 1) * config.site.entriesPerPage}&take=${
                config.site.entriesPerPage
              }`
            )
          }
        >
          <Pagination.Next>
            <ChevronRight />
          </Pagination.Next>
          <Pagination.Previous>
            <ChevronLeft />
          </Pagination.Previous>
        </Pagination>
      )}
    </Page>
  )
}

export default ViewSnippts
