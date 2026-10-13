import { useNavigate } from 'react-router-dom'
import Logo from '@/components/Logo'
import { ChevronRightIcon } from '@/components/icons'
import './splash.css'

export default function SplashPage() {
  const navigate = useNavigate()

  return (
    <main className="splash">
      <div className="splash__content">
        <Logo className="logo--splash" />
        <p className="splash__tagline">
          Mais produtividade.
          <br />
          Solo mais saudável.
          <br />
          Um futuro sustentável.
        </p>
      </div>

      <button type="button" className="splash__cta" onClick={() => navigate('/login')}>
        <span>Começar</span>
        <ChevronRightIcon className="splash__cta-icon" />
      </button>
    </main>
  )
}
