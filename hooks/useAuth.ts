import useSWR from 'swr'
import { fetcher } from '../lib/common'
import { LoginResponse } from '../pages/api/auth/login'
import { LogoutResponse } from '../pages/api/auth/logout'
import { AuthenticationStatusResponse } from '../pages/api/auth/status'

const useIsLoggedIn = () => {
  const { data, error } = useSWR<AuthenticationStatusResponse, Error>(
    '/api/auth/status',
    fetcher
  )
  const serverError = data && data.status !== 'success'

  return {
    isLoading: !error && !data,
    isError: !!(error || serverError),
    data,
  }
}

const login = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return response.json()
}

const logout = async (): Promise<LogoutResponse> => {
  const response = await fetch('/api/auth/logout')
  return response.json()
}

const useAuth = () => {
  return {
    isLoggedIn: useIsLoggedIn,
    login,
    logout,
  }
}

export default useAuth
