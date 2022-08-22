import useSWR from 'swr'
import { fetcher } from '../lib/common'
import { GetSnipptsResponse } from '../pages/api/snippts'
import { DeleteSnipptResponse } from '../pages/api/snippts/delete'
import { EditSnipptResponse } from '../pages/api/snippts/edit'
import { CreateSnipptResponse } from '../pages/api/snippts/new'
import { GetSnipptResponse } from '../pages/api/snippts/[id]'

const useSingleSnippt = (id: number) => {
  const { data, error } = useSWR<GetSnipptResponse, Error>(
    `/api/snippts/${id}`,
    fetcher
  )
  const serverError = (data && data.status !== 'success') || data?.data === null

  return {
    data,
    isLoading: !error && !data,
    isError: !!(error || serverError),
  }
}

const useAllSnippts = (skip: number, take: number) => {
  const { data, error } = useSWR<GetSnipptsResponse, Error>(
    `/api/snippts?skip=${skip}&take=${take}`,
    fetcher
  )
  const serverError = data && data.status !== 'success'

  return {
    data,
    isLoading: !error && !data,
    isError: error || serverError,
  }
}

const deleteSnippt = async (id: number): Promise<DeleteSnipptResponse> => {
  const response = await fetch(`/api/snippts/delete?id=${id}`, {
    method: 'DELETE',
  })

  return response.json()
}

const editSnippt = async (
  id: number,
  body: unknown
): Promise<EditSnipptResponse> => {
  const response = await fetch(`/api/snippts/edit?id=${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  return response.json()
}

const createSnippt = async (body: unknown): Promise<CreateSnipptResponse> => {
  const response = await fetch(`/api/snippts/new`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  return response.json()
}

export default function useSnippts() {
  return {
    one: useSingleSnippt,
    all: useAllSnippts,
    delete: deleteSnippt,
    edit: editSnippt,
    create: createSnippt,
  }
}
