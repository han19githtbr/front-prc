/** Credenciais enviadas ao back-end (Spring Boot) no login. */
export interface LoginCredentials {
  /** E-mail ou nome de usuário */
  identifier: string
  password: string
  /** "Lembrar de mim": decide se o token fica em localStorage (true) ou sessionStorage (false) */
  remember: boolean
}

export interface AuthUser {
  id: string
  name: string
  email: string
  roles?: string[]
}

/**
 * Formato esperado da resposta de POST /auth/login.
 * Ajuste quando o contrato do back-end estiver definido.
 */
export interface AuthResponse {
  accessToken: string
  tokenType?: string
  user: AuthUser
}
