import useSWR from 'swr'
import { fetcher } from '../lib/common'
import { GetTemplatesResponse } from '../pages/api/templates'
import { DeleteTemplateResponse } from '../pages/api/templates/delete'
import { EditTemplateResponse } from '../pages/api/templates/edit'
import { CreateTemplateResponse } from '../pages/api/templates/new'
import { GetTemplateResponse } from '../pages/api/templates/[id]'

const useSingleTemplate = (id: number) => {
  const { data, error } = useSWR<GetTemplateResponse, Error>(
    `/api/templates/${id}`,
    fetcher
  )
  const serverError = (data && data.status !== 'success') || data?.data === null

  return {
    data,
    isLoading: !error && !data,
    isError: !!(error || serverError),
  }
}

const useAllTemplates = () => {
  const { data, error } = useSWR<GetTemplatesResponse, Error>(
    '/api/templates',
    fetcher
  )
  const serverError = data && data.status !== 'success'

  return {
    data,
    isLoading: !error && !data,
    isError: error || serverError,
  }
}

const deleteTemplate = async (id: number): Promise<DeleteTemplateResponse> => {
  const response = await fetch(`/api/templates/delete?id=${id}`, {
    method: 'DELETE',
  })

  return response.json()
}

const editTemplate = async (
  id: number,
  body: unknown
): Promise<EditTemplateResponse> => {
  const response = await fetch(`/api/templates/edit?id=${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  return response.json()
}

const createTemplate = async (
  body: unknown
): Promise<CreateTemplateResponse> => {
  const response = await fetch(`/api/templates/new`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  return response.json()
}

export default function useTemplates() {
  return {
    one: useSingleTemplate,
    all: useAllTemplates,
    delete: deleteTemplate,
    edit: editTemplate,
    create: createTemplate,
  }
}
