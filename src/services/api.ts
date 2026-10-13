import axios from 'axios'
import { tokenStorage } from './tokenStorage'

export const UNAUTHORIZED_EVENT = 'prc:unauthorized'

/** Instância única do Axios usada por todos os serviços. */
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:8081/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
})

// Anexa o token JWT em toda requisição autenticada.
api.interceptors.request.use((config) => {
  const token = tokenStorage.get()
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Sessão expirada/inválida: limpa o token e avisa o AuthContext.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      tokenStorage.clear()
      window.dispatchEvent(new Event(UNAUTHORIZED_EVENT))
    }
    return Promise.reject(error)
  },
)
