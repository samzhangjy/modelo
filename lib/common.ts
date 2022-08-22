import Joi from 'joi'

export const getAvatarDisplayText = (name: string) => {
  return name
    .split(/\s/)
    .reduce((response, word) => (response += word.slice(0, 1)), '')
}

export const CodeSnipptSchema = Joi.object({
  id: Joi.number().optional(),
  createdAt: Joi.date().iso().optional(),
  updatedAt: Joi.date().iso().optional(),
  name: Joi.string().max(255),
  overview: Joi.string(),
  description: Joi.string().optional().allow(''),
  code: Joi.string(),
})

export const CodeSnipptPartialSchema = Joi.object({
  id: Joi.number().optional(),
  createdAt: Joi.date().iso().optional(),
  updatedAt: Joi.date().iso().optional(),
  name: Joi.string().max(255).optional(),
  overview: Joi.string().optional(),
  description: Joi.string().optional(),
  code: Joi.string().optional(),
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init)
  return res.json()
}

export function poster(payload?: RequestInit) {
  return async (input: RequestInfo, init?: RequestInit) => {
    const res = await fetch(input, { method: 'POST', ...payload, ...init })
    return res.json()
  }
}
