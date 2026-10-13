import { createContext, useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { UNAUTHORIZED_EVENT } from '@/services/api'
import { authService } from '@/services/authService'
import { tokenStorage } from '@/services/tokenStorage'
import type { AuthUser, LoginCredentials } from '@/types/auth'

export interface AuthContextValue {
  user: AuthUser | null
  isAuthenticated: boolean
  /** true enquanto a sessão guardada está sendo validada ao abrir o app */
  isLoading: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)

/** Enquanto o back-end não existe, nada é enviado: defina VITE_AUTH_ENABLED=true para ativar. */
export const AUTH_ENABLED = import.meta.env.VITE_AUTH_ENABLED === 'true'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(AUTH_ENABLED && tokenStorage.get() !== null)

  // Restaura a sessão a partir do token salvo.
  useEffect(() => {
    if (!isLoading) return
    let active = true
    authService
      .me()
      .then((me) => active && setUser(me))
      .catch(() => tokenStorage.clear())
      .finally(() => active && setIsLoading(false))
    return () => {
      active = false
    }
  }, [isLoading])

  // Qualquer resposta 401 derruba a sessão.
  useEffect(() => {
    const onUnauthorized = () => setUser(null)
    window.addEventListener(UNAUTHORIZED_EVENT, onUnauthorized)
    return () => window.removeEventListener(UNAUTHORIZED_EVENT, onUnauthorized)
  }, [])

  const login = useCallback(async (credentials: LoginCredentials) => {
    const { accessToken, user: loggedUser } = await authService.login(credentials)
    tokenStorage.set(accessToken, credentials.remember)
    setUser(loggedUser)
  }, [])

  const logout = useCallback(async () => {
    await authService.logout()
    tokenStorage.clear()
    setUser(null)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({ user, isAuthenticated: user !== null, isLoading, login, logout }),
    [user, isLoading, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
