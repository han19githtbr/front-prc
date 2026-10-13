const TOKEN_KEY = 'prc.accessToken'

/**
 * Guarda o token de acesso.
 * remember = true  -> localStorage (sobrevive ao fechar o navegador)
 * remember = false -> sessionStorage (some ao fechar a aba)
 */
export const tokenStorage = {
  get(): string | null {
    return localStorage.getItem(TOKEN_KEY) ?? sessionStorage.getItem(TOKEN_KEY)
  },
  set(token: string, remember: boolean): void {
    this.clear()
    ;(remember ? localStorage : sessionStorage).setItem(TOKEN_KEY, token)
  },
  clear(): void {
    localStorage.removeItem(TOKEN_KEY)
    sessionStorage.removeItem(TOKEN_KEY)
  },
}
