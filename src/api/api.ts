// api.ts
import axios from 'axios'
import {
  BaseQueryApi,
  createApi,
  FetchArgs,
  fetchBaseQuery
} from '@reduxjs/toolkit/query/react'
import { useEffect } from 'react'
const api = axios.create({
  baseURL: 'http://localhost:8080'
})

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('app_token')
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`
//   }
//   return config
// })

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('app_token')
  console.log('[Interceptor] Usando token:', token)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// api.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     if (err.response?.status === 401) {
//       localStorage.removeItem('app_token')
//       window.location.href = '/login'
//     }
//     return Promise.reject(err)
//   }
// )

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8080',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('app_token')
    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
    }
    return headers
  }
})

const baseQueryWithLogout = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  const result = await baseQuery(args, api, extraOptions)

  if (result.error?.status === 401) {
    // Token expirado
    localStorage.removeItem('app_token')
    window.location.href = '/login' // ou use navigate('/login')
  }

  return result
}

export const apiSlice = createApi({
  baseQuery: baseQueryWithLogout,
  endpoints: () => ({})
})

export default api
