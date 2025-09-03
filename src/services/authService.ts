import api from '../api/api'

const TOKEN_KEY = 'app_token'

export const login = async (username: string, password: string) => {
  const response = await api.post('/auth/login', { username, password })
  const token = response.data.token
  localStorage.setItem(TOKEN_KEY, token)
  return token
}

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY)
}

export const getToken = () => localStorage.getItem(TOKEN_KEY)

export const isAuthenticated = () => !!getToken()
