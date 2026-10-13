import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Logo from '@/components/Logo'
import { AppleIcon, CheckIcon, EyeIcon, EyeOffIcon, GoogleIcon } from '@/components/icons'
import { AUTH_ENABLED } from '@/contexts/AuthContext'
import { useAuth } from '@/hooks/useAuth'
import './login.css'

interface FieldErrors {
  identifier?: string
  password?: string
}

function validate(identifier: string, password: string): FieldErrors {
  const errors: FieldErrors = {}
  if (!identifier.trim()) errors.identifier = 'Informe seu e-mail ou usuário.'
  if (!password) errors.password = 'Informe sua senha.'
  return errors
}

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const redirectTo = (location.state as { from?: { pathname: string } } | null)?.from?.pathname ?? '/app'

  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError(null)

    const found = validate(identifier, password)
    setErrors(found)
    if (Object.keys(found).length > 0) return

    // Por enquanto só o visual: nada é enviado até o back-end existir.
    // Para ativar, defina VITE_AUTH_ENABLED=true e ajuste src/services/authService.ts.
    if (!AUTH_ENABLED) return

    try {
      setSubmitting(true)
      await login({ identifier: identifier.trim(), password, remember })
      navigate(redirectTo, { replace: true })
    } catch {
      setFormError('Não foi possível entrar. Verifique seus dados e tente novamente.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="login">
      <aside className="login__hero" aria-hidden="true">
        <p className="login__hero-text">
          Mais produtividade.
          <br />
          Solo mais saudável.
          <br />
          Um futuro sustentável.
        </p>
      </aside>

      <section className="login__panel">
        <div className="login__card">
          <Logo className="logo--login" />

          <header className="login__header">
            <h1 className="login__title">Bem-vindo de volta!</h1>
            <p className="login__subtitle">Entre com seu usuário para continuar.</p>
          </header>

          <form className="login__form" onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label className="field__label" htmlFor="identifier">
                E-mail ou usuário
              </label>
              <input
                id="identifier"
                name="identifier"
                className="field__input"
                type="text"
                inputMode="email"
                autoComplete="username"
                autoCapitalize="none"
                spellCheck={false}
                placeholder="seu@email.com"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                aria-invalid={errors.identifier ? true : undefined}
                aria-describedby={errors.identifier ? 'identifier-error' : undefined}
              />
              {errors.identifier && (
                <p id="identifier-error" className="field__error" role="alert">
                  {errors.identifier}
                </p>
              )}
            </div>

            <div className="field">
              <label className="field__label" htmlFor="password">
                Senha
              </label>
              <div className="field__control">
                <input
                  id="password"
                  name="password"
                  className="field__input field__input--with-action"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-invalid={errors.password ? true : undefined}
                  aria-describedby={errors.password ? 'password-error' : undefined}
                />
                <button
                  type="button"
                  className="field__action"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                  aria-pressed={showPassword}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
              {errors.password && (
                <p id="password-error" className="field__error" role="alert">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="login__row">
              <label className="check">
                <input
                  className="check__input"
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <span className="check__box" aria-hidden="true">
                  <CheckIcon />
                </span>
                <span>Lembrar de mim</span>
              </label>

              <Link className="login__link" to="/recuperar-senha">
                Esqueceu a senha?
              </Link>
            </div>

            {formError && (
              <p className="login__alert" role="alert">
                {formError}
              </p>
            )}

            <button type="submit" className="login__submit" disabled={submitting}>
              {submitting ? 'Entrando…' : 'Entrar'}
            </button>
          </form>

          <div className="login__divider" role="separator">
            <span>ou</span>
          </div>

          <div className="login__social">
            {/* TODO(OAuth): ligar aos provedores quando o back-end suportar */}
            <button type="button" className="social" aria-label="Entrar com Google">
              <GoogleIcon />
            </button>
            <button type="button" className="social" aria-label="Entrar com Apple">
              <AppleIcon />
            </button>
          </div>

          <p className="login__signup">
            Não tem uma conta?{' '}
            <Link className="login__link login__link--strong" to="/cadastro">
              Cadastre-se
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}
