/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** URL base da API Spring Boot. Ex.: http://localhost:8081/api */
  readonly VITE_API_URL: string
  /** Habilita o envio real do login. Mantenha "false" até o back-end estar pronto. */
  readonly VITE_AUTH_ENABLED: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
