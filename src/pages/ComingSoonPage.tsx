import { Link } from 'react-router-dom'

interface Props {
  title: string
}

/** Página provisória para rotas que ainda não foram implementadas. */
export default function ComingSoonPage({ title }: Props) {
  return (
    <main style={{ minHeight: '100dvh', display: 'grid', placeItems: 'center', padding: '1.5rem', textAlign: 'center' }}>
      <div>
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>{title}</h1>
        <p style={{ color: 'var(--muted)' }}>Esta tela será implementada em breve.</p>
        <Link to="/login" style={{ color: 'var(--green-700)', fontWeight: 600 }}>
          Voltar ao login
        </Link>
      </div>
    </main>
  )
}
