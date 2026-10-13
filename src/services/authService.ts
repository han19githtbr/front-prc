import { api } from './api'
import type { AuthResponse, AuthUser, LoginCredentials } from '@/types/auth'

/**
 * Chamadas de autenticação.
 * Os endpoints abaixo são uma sugestão — ajuste quando as rotas do Spring Boot existirem.
 */
export const authService = {
  async login({ identifier, password }: LoginCredentials): Promise<AuthResponse> {
    // TODO(back-end): confirmar rota e nomes dos campos do DTO (ex.: "email" em vez de "identifier").
    const { data } = await api.post<AuthResponse>('/auth/login', { identifier, password })
    return data
  },

  async me(): Promise<AuthUser> {
    // TODO(back-end): rota que devolve o usuário do token atual.
    const { data } = await api.get<AuthUser>('/auth/me')
    return data
  },

  async logout(): Promise<void> {
    // TODO(back-end): só necessário se houver invalidação de token/refresh no servidor.
    await api.post('/auth/logout').catch(() => undefined)
  },
}
